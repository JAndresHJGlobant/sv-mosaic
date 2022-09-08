import React from "react";
import styled from "styled-components";
// import jsvalidator from "jsvalidator";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";

import theme from "@root/theme";
import Button from "@root/components/Button";
import { BodyText } from "@root/components/Typography";

const LabelWrapper = styled.div`
	display: flex;
	align-items: center;

	& > .dropdownIcon {
		color: ${theme.colors.gray600};
		margin-left: 4px;
		margin-right: -4px;
	}

	& > .removeIcon {
		margin-left: 4px;
		margin-right: -4px;
		color: black;
		background-color: ${theme.colors.blue}12;
		border-radius: 20px;
		padding: 3px;
		box-sizing: border-box;
	}

	& > .removeIcon:hover {
		background-color: ${theme.colors.blue}45;
	}

	& > .filter-label {
		font-weight: ${theme.fontWeight.normal};
		margin-right: 8px;
		text-transform: capitalize;
	}

	& > .filter-value {
		font-weight: ${theme.fontWeight.normal};
		margin-right: 8px;
		text-transform: none;
	}

	&.type_optional > * {
		color: ${theme.colors.blue};
	}
`;

interface DataViewPrimaryFilterProps {
	label?: any;
	value?: any;
	color?: any;
	type?: any;
	onRemove?: any;
	onClick?: any;
}
// interface DataViewPrimaryFilterProps {
// 	label?: string;
// 	value?: string;
// 	color?: ButtonProps["color"];
// 	type?: "primary" | "optional";
// 	onRemove?: () => void;
// 	onClick?: ButtonProps["onClick"];
// }
//TODO PROPS
function DataViewPrimaryFilter(props: DataViewPrimaryFilterProps) {
	// jsvalidator.validate(props, {
	// 	type : "object",
	// 	schema : [
	// 		{ name : "label", type : "string", required : true },
	// 		{ name : "value", type : "string" },
	// 		{ name : "color", type : "string", required : false },
	// 		{ name : "type", type : "string", enum : ["primary", "optional"], required : true },
	// 		{ name : "onRemove", type : "function", required : true },
	// 		{ name : "onClick", type : "function", required : true }
	// 	],
	// 	allowExtraKeys : false,
	// 	throwOnInvalid : true
	// });

	const remove = function(e) {
		// stops the outer wrapping click handler from firing
		e.stopPropagation();

		// call the passed in onRemove function
		props.onRemove();
	}

	const variant = props.type === "primary" ? "text" : "contained";
	const color = props.type === "primary" ? "black" : "lightBlue";

	const label = (
		<LabelWrapper
			className={`
				type_${props.type}
			`}
		>
			<BodyText className="filter-label">{props.label}:</BodyText>
			<BodyText className="filter-value" color={ props.color ? props.color : color}><b>{props.value || "Any"}</b></BodyText>
			{
				props.type === "optional" &&
				<CloseIcon
					className="icon removeIcon"
					onClick={remove}
				/>
			}
		</LabelWrapper>
	)

	return (
		<Button
			color={ props.color ? props.color : color}
			variant={variant}
			size="small"
			onClick={props.onClick}
			label={label}
			iconPosition="right"
			mIcon={ExpandMoreIcon}
		/>
	)
}

export default DataViewPrimaryFilter;
