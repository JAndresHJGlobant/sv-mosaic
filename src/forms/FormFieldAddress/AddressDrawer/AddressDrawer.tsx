import * as React from "react";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { FieldDef } from "@root/components/Field/FieldTypes";
import { ButtonProps } from "@root/components/Button";

// Components
import Form, { formActions, useForm } from "@root/components/Form";

// Utils
import countriesWithStates from "@root/forms/FormFieldAddress/utils/trimmedCountriesStates.json";
import { TextFieldDef } from "@root/forms/FormFieldText";
import { IAddress } from "@root/forms/FormFieldAddress";
import { AddressDrawerProps } from "../AddressTypes";
import _ from "lodash";

// Layout of the form elements.
const sections = [
	{
		fields: [
			[["country"]],
			[["address1"]],
			[["address2"]],
			[["address3"]],
			[["city"], ["states"], ["postalCode"]],
			[["type"]],
		],
	},
];

const countries = countriesWithStates?.map((country) => ({
	label: country.name,
	value: country.iso2,
}));

const AddressDrawer = (props: AddressDrawerProps): ReactElement => {
	const {
		value,
		onChange,
		open,
		addressToEdit,
		isEditing,
		addressIdx,
		handleClose,
		setIsEditing,
		handleUnsavedChanges,
		dialogOpen,
		handleDialogClose,
		addressTypes
	} = props;

	const { dispatch, state } = useForm();
	const [initialState, setInitialState] = useState(state.data);

	useEffect(() => {
		if (state.data !== undefined && initialState !== undefined)
			handleUnsavedChanges(!_.isEqual(initialState, state.data));
	}, [state.data, initialState]);

	useEffect(() => {
		let isMounted = true;
		if (isEditing && open && isMounted) {
			let editingState = {};

			const fullCountryData = countriesWithStates?.find(
				(c) => c.iso2 === addressToEdit?.country
			);

			const fullStateData = fullCountryData.states.find(
				(s) => s.code === addressToEdit?.state
			);

			dispatch(
				formActions.setFieldValue({
					name: "address1",
					value: addressToEdit.address1,
				})
			);

			editingState = {
				...editingState,
				"address1": addressToEdit.address1,
			};

			if (addressToEdit.address2) {
				dispatch(
					formActions.setFieldValue({
						name: "address2",
						value: addressToEdit.address2,
					})
				);

				editingState = {
					...editingState,
					"address2": addressToEdit.address2,
				};
			}
			if (addressToEdit.address3) {
				dispatch(
					formActions.setFieldValue({
						name: "address3",
						value: addressToEdit.address3,
					})
				);

				editingState = {
					...editingState,
					"address3": addressToEdit.address3,
				};
			}
			dispatch(
				formActions.setFieldValue({
					name: "city",
					value: addressToEdit.city,
				})
			);

			editingState = {
				...editingState,
				"city": addressToEdit.city,
			};

			dispatch(
				formActions.setFieldValue({
					name: "postalCode",
					value: addressToEdit.postalCode,
				})
			);

			editingState = {
				...editingState,
				"postalCode": addressToEdit.postalCode,
			};

			dispatch(
				formActions.setFieldValue({
					name: "type",
					value: addressToEdit.types,
				})
			);

			editingState = {
				...editingState,
				"type": addressToEdit.types,
			};

			dispatch(
				formActions.setFieldValue({
					name: "country",
					value: fullCountryData?.iso2,
				})
			);

			editingState = {
				...editingState,
				"country": { label: fullCountryData?.name, value: fullCountryData?.iso2 },
			};

			dispatch(
				formActions.setFieldValue({
					name: "states",
					value: fullStateData?.code,
				})
			);

			editingState = {
				...editingState,
				"states": {
					label: fullStateData?.name,
					value: fullStateData?.code,
				},
			};

			setInitialState(editingState);
		}

		return () => {
			isMounted = false;
		}
	}, [addressToEdit]);

	/**
   * Gets the list of states for the
   * selected country
   */
	const listOfStates = useMemo(() => {
		const selectedCountry = countriesWithStates?.find(
			(c) => c.iso2 === state?.data?.country
		);

		if (selectedCountry) {
			return selectedCountry.states.map((state) => ({ label: state.name, value: state.code }));
		}

		return [];
	}, [state?.data?.country]);

	/**
	 * Executed on the form submit if editing mode is true
	 * @returns the list of addresses with the new updates
	 */
	const editAddress = (): IAddress[] => {
		const listOfAddresses = [...value];

		listOfAddresses[addressIdx].address1 = state?.data?.address1;
		listOfAddresses[addressIdx].address2 = state?.data?.address2;
		listOfAddresses[addressIdx].address3 = state?.data?.address3;
		listOfAddresses[addressIdx].city = state?.data?.city;
		listOfAddresses[addressIdx].postalCode = state?.data?.postalCode.trim();
		listOfAddresses[addressIdx].country = state?.data?.country;
		listOfAddresses[addressIdx].state = state?.data?.states;
		listOfAddresses[addressIdx].types = state?.data?.type;

		return listOfAddresses;
	};

	/**
	 * Executed on the form submit if editing mode is false
	 * @returns the lists of addresses with the new ones created
	 */
	const addNewAddress = (): IAddress[] => {
		const listOfAddresses = [...value];
		const id = listOfAddresses?.length + 1;

		listOfAddresses.push({
			id: id,
			address1: state?.data?.address1,
			address2: state?.data?.address2,
			address3: state?.data?.address3,
			city: state?.data?.city,
			postalCode: state?.data?.postalCode.trim(),
			country: state?.data?.country,
			state: state?.data?.states,
			types: state?.data?.type,
		});
		setIsEditing(false);

		return listOfAddresses;
	};

	/**
	 * Form submit handler.
	 * It adds a new address or edits an existing one and then
	 * closes the Drawer.
	 */
	const onSubmit = async () => {
		const { valid } = await dispatch(formActions.submitForm());
		if (!valid) return;

		const listOfAddresses = isEditing ? editAddress() : addNewAddress();

		onChange && (await onChange(listOfAddresses));
		handleClose(true);
	};

	const fields = useMemo(
		() =>
			[
				{
					name: "country",
					type: "dropdown",
					label: "Country",
					size: "sm",
					required: true,
					inputSettings: {
						options: countries,
					},
				},
				{
					name: "address1",
					type: "text",
					label: "Address",
					size: "lg",
					required: true,
				} as FieldDef<TextFieldDef>,
				{
					name: "address2",
					type: "text",
					label: undefined,
					size: "lg",
				} as FieldDef<TextFieldDef>,
				{
					name: "address3",
					type: "text",
					label: undefined,
					size: "lg",
				} as FieldDef<TextFieldDef>,
				{
					name: "city",
					type: "text",
					label: "City",
					size: "sm",
					required: true,
				} as FieldDef<TextFieldDef>,
				{
					name: "states",
					type: "dropdown",
					label: "States",
					size: "sm",
					inputSettings: {
						options: listOfStates,
					},
				},
				{
					name: "postalCode",
					type: "text",
					label: "Postal Code",
					size: "sm",
					required: true,
					inputSettings: {
						type: "string",
					},
				} as FieldDef<TextFieldDef>,
				{
					name: "type",
					type: "checkbox",
					label: "Type",
					size: "sm",
					required: true,
					inputSettings: {
						options: addressTypes,
					},
				},
			] as FieldDef[],
		[countries, listOfStates, addressTypes]
	);

	const buttons: ButtonProps[] = [
		{
			label: "Cancel",
			onClick: () => handleClose(),
			color: "gray",
			variant: "outlined"
		},
		{
			label: "Save",
			onClick: onSubmit,
			color: "yellow",
			variant: "contained"
		}
	];

	return (
		<div style={{width: "1160px"}}>
			<Form
				title='Address Information'
				buttons={buttons}
				data-testid={"address-testid"}
				state={state}
				dispatch={dispatch}
				sections={sections}
				fields={fields}
				type='drawer'
				dialogOpen={dialogOpen}
				handleDialogClose={handleDialogClose}
			/>
		</div>
	);
};

export default AddressDrawer;
