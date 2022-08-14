// import * as React from "react";
// import { ReactElement, useMemo } from "react";
// import { boolean, withKnobs, text } from "@storybook/addon-knobs";
// import { Meta } from "@storybook/addon-docs/blocks";
// import { useForm } from "../Form";
// import { FormFieldRadioDef } from ".";
// import { FieldDef } from "@root/components/Field";
// import { onCancel, renderButtons } from "@root/utils/storyUtils";

// // Components
// import Form from "@root/forms/Form/Form";

// export default {
// 	title: "FormFields/FormFieldRadio",
// 	decorators: [withKnobs],
// } as Meta;

// const options = [
// 	{
// 		label: "Label 1",
// 		value: "label_1",
// 	},
// 	{
// 		label: "Label 2",
// 		value: "label_2",
// 	},
// 	{
// 		label: "Label 3",
// 		value: "label_3",
// 	},
// ];

// export const Playground = (): ReactElement => {
// 	const { state, dispatch } = useForm();
// 	const label = text("Label", "Label");
// 	const required = boolean("Required", false);
// 	const disabled = boolean("Disabled", false);
// 	const instructionText = text("Instruction text", "");
// 	const helperText = text("Helper text", "");

// 	const fields = useMemo(
// 		() =>
// 			[
// 				{
// 					name: "radio",
// 					label,
// 					type: "radio",
// 					required,
// 					disabled,
// 					inputSettings: {
// 						options,
// 					},
// 					helperText,
// 					instructionText,
// 				}
// 			] as FieldDef<FormFieldRadioDef>[],
// 		[label, required, disabled, instructionText, helperText]
// 	);

// 	return (
// 		<>
// 			<pre>{JSON.stringify(state, null, "  ")}</pre>
// 			<Form
// 				buttons={renderButtons(dispatch)}
// 				title={text("Form Title", "Form Title")}
// 				description={text("Form Description", "This is a description example")}
// 				state={state}
// 				fields={fields}
// 				dispatch={dispatch}
// 				onCancel={onCancel}
// 			/>
// 		</>
// 	);
// };

// export const KitchenSink = (): ReactElement => {
// 	const { state, dispatch } = useForm();
// 	const fields = useMemo(
// 		() =>
// 			[
// 				{
// 					name: "radio",
// 					label: "Regular example",
// 					type: "radio",
// 					required: false,
// 					disabled: false,
// 					inputSettings: {
// 						options,
// 					},
// 					helperText: "Helper text",
// 					instructionText: "Instruction text",
// 				},
// 				{
// 					name: "radio-disabled",
// 					label: "Disabled example",
// 					type: "radio",
// 					required: false,
// 					disabled: true,
// 					inputSettings: {
// 						options,
// 					},
// 					helperText: "Helper text",
// 					instructionText: "Instruction text",
// 				},
// 			] as FieldDef<FormFieldRadioDef>[],
// 		[]
// 	);

// 	return (
// 		<>
// 			<pre>{JSON.stringify(state, null, "  ")}</pre>
// 			<Form
// 				buttons={renderButtons(dispatch)}
// 				title='Form Title'
// 				description='This is a description example'
// 				state={state}
// 				fields={fields}
// 				dispatch={dispatch}
// 				onCancel={onCancel}
// 			/>
// 		</>
// 	);
// };
