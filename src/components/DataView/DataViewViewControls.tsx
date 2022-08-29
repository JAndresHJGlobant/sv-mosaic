import React, { useState } from "react";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";

import ButtonRow from "../ButtonRow";
import Button from "../Button";
import DataViewViewDrawer from "./DataViewViewDrawer";
import DataViewViewSaveDrawer from "./DataViewViewSaveDrawer";
import { useMosaicTranslation } from "@root/i18n";

const ViewSpan = styled.span`
	display: inline-flex;
	align-items: center;
	
	& > .icon {
		margin-right: 3px;
	}

	& > p {
		margin: 0;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		max-width: 200px;
	}
`

const TitleButton = styled(Button)`
	max-width: 300px;
`

function DataViewViewControls(props) {
	const [state, setState] = useState({
		viewOpen : false,
		saveOpen : false
	});

	const { t } = useMosaicTranslation();
	
	const toggleViewDrawer = function() {
		setState({
			...state,
			viewOpen : !state.viewOpen
		});
	}
	
	const toggleSaveDrawer = function() {
		setState({
			...state,
			saveOpen : !state.saveOpen
		});
	}
	
	const ViewLabel = (
		<ViewSpan>
			<ViewQuiltIcon className="icon"/> 
			<p>
				{props.savedView.label}
			</p>
		</ViewSpan>
	)
	
	const saveMenuItems = [
		{
			label : t("mosaic:DataView.save_as_new_view"),
			onClick : function() {
				toggleSaveDrawer();
			}
		},
		{
			label : t("mosaic:DataView.overwrite_current_view"),
			disabled : props.savedView.type === "default" || (props.savedView.type === "shared" && !props.savedViewAllowSharedViewSave),
			onClick : async function() {
				await props.savedViewCallbacks.onSave({
					...props.savedView,
					state : props.savedViewState
				});
			}
		}
	]
	
	const savedViewData = {
		id : undefined,
		label : "",
		type : "mine",
		state : props.savedViewState
	}
	
	return (
		<div>
			<div className="right">
				<ButtonRow>
					<Button
						mIcon={ExpandMoreIcon}
						iconPosition="right"
						label={t("mosaic:DataView.save_as")}
						variant="outlined"
						size="small"
						color="blue"
						menuItems={saveMenuItems}
					/>
					<TitleButton
						mIcon={ExpandMoreIcon}
						iconPosition="right"
						label={ViewLabel}
						variant="contained"
						size="small"
						color="lightBlue"
						onClick={toggleViewDrawer}
					/>
				</ButtonRow>
			</div>
			<DataViewViewSaveDrawer
				open={state.saveOpen}
				data={savedViewData}
				onClose={toggleSaveDrawer}
				onSave={props.savedViewCallbacks.onSave}
				allowSharedViewSave={props.savedViewAllowSharedViewSave}
			/>
			<DataViewViewDrawer
				open={state.viewOpen}
				onClose={toggleViewDrawer}
				onRemove={props.savedViewCallbacks.onRemove}
				onSave={props.savedViewCallbacks.onSave}
				onChange={props.savedViewCallbacks.onChange}
				onGetOptions={props.savedViewCallbacks.onGetOptions}
				allowSharedViewSave={props.savedViewAllowSharedViewSave}
			/>
		</div>
	)
}

export default DataViewViewControls;