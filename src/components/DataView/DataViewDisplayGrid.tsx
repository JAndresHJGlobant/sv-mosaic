import React, { ReactNode } from "react";
import { useMemo } from "react";
import styled from "styled-components";

import Checkbox from "../Checkbox";
import DataViewActionsButtonRow from "./DataViewActionsButtonRow";
import theme, { BREAKPOINTS } from "@root/theme/theme";
import DataViewBulkActionsButtonsRow from "./DataViewBulkActionsButtonsRow";
import DataViewDisplayGridSortControl from "./DataViewDisplayGridSortControl";
import { transformRows } from "../../utils/dataViewTools";

import DataViewBulkAllBar from "./DataViewBulkAllBar";
// import { MosaicCallback, MosaicObject } from "@root/types";
// import { DataViewOnSortChange, DataViewSort, DataViewAction, DataViewAdditionalAction, DataViewColumn } from "./DataViewTypes";

const BIG_SCREEN_BREAKPOINT = BREAKPOINTS.topComponent.bigScreenView + "px";
const RESPONSIVE_BREAKPOINT = BREAKPOINTS.topComponent.responsiveView + "px";
const MOBILE_BREAKPOINT = BREAKPOINTS.mobile + "px";

const StyledDiv = styled.div`
	& > .topRow {
		margin-bottom: 4px;
		position: sticky;
		top: 0;
		z-index: 1;
		background: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: ${theme.colors.gray200};
	}

	& > .topRowBulkAll {
		margin-bottom: 5px;
	}

	& > .grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-column-gap: 8px;
		grid-row-gap: 20px;

		@media (min-width: ${MOBILE_BREAKPOINT}) {
			grid-template-columns: repeat(2, 1fr);
		};

		@media (min-width: 768px) {
			grid-template-columns: repeat(3, 1fr);
		};

		@media (min-width: ${RESPONSIVE_BREAKPOINT}) {
			grid-template-columns: repeat(4, 1fr);
		};

		@media (min-width: 1296px) {
			grid-template-columns: repeat(5, 1fr);
		};

		@media (min-width: ${BIG_SCREEN_BREAKPOINT}) {
			grid-template-columns: repeat(6, 1fr);
		}
	}

	& > .grid > .cell {
		min-width: 0;
	}

	& > .grid > .cell.checked > .image > .checkboxContainer {
		opacity: 1;
	}

	& > .grid > .cell.checked > .image > .checkboxContainer > .mask {
		opacity: 1;
		border: 2px solid rgba(255, 255, 255, .5);
		margin: 6px;
	}

	& > .grid > .cell > img {
		max-width: 100%;
		min-width: 100%;
	}

	& > .grid > .cell h2 {
		margin: 0;
		font-size: 14px;
		font-weight: normal;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	& > .grid > .cell h3 {
		margin: 0;
		font-weight: normal;
		font-size: 12px;
		color: ${theme.colors.gray500};
	}

	& > .grid > .cell .image {
		position: relative;
	}

	& > .grid > .cell > .image > .checkboxContainer {
		opacity: 0;
		position: absolute;
		top: 0px;
		left: 0px;
		transition: opacity 150ms;
	}

	& > .grid > .cell > .image:hover > .checkboxContainer {
		opacity: 1;
	}

	& > .grid > .cell > .image > .checkboxContainer > .mask {
		position: absolute;
		width: 18px;
		height: 18px;
		left: 4px;
		top: 4px;
		margin: 8px;
		background: white;
		border-radius: 3px;
		opacity: .8;
	}

	& > .grid > .cell .image img {
		width: 100%;
	}

	& > .grid > .cell .info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 100%;
	}

	& > .grid > .cell > .info > .left {
		min-width: 0;
	}

	& > .grid > .cell > .info > .right {
		flex-shrink: 0;
	}
`

interface DataViewDisplayGridProps {
	gridColumnsMap?: any;
	data?: any;
	columns?: any;
	onCheckboxClick?: any;
	checked?: any;
	bulkActions?: any;
	onSortChange?: any;
	sort?: any;
	rowCount?: any;
	count?: any;
	onCheckAllClick?: any;
	checkedAllPages?: any;
	onCheckAllPagesClick?: any;
	primaryActions?: any;
	additionalActions?: any;
}
// interface DataViewDisplayGridProps {
// 	gridColumnsMap?: {
// 		image?: string | number;
// 		primary?: string | number;
// 		secondary?: string | number;
// 	};
// 	data?: MosaicObject[];
// 	columns?: DataViewColumn[];
// 	onCheckboxClick?: (arg0: any) => void;
// 	checked?: any[];
// 	bulkActions?: any[];
// 	onSortChange?: DataViewOnSortChange;
// 	sort?: DataViewSort;
// 	rowCount?: number;
// 	count?: number;
// 	onCheckAllClick?: React.MouseEventHandler<HTMLButtonElement>;
// 	checkedAllPages?: boolean;
// 	onCheckAllPagesClick?: MosaicCallback;
// 	primaryActions?: DataViewAction[];
// 	additionalActions?: DataViewAdditionalAction[];
// }

function DataViewDisplayGrid(props: DataViewDisplayGridProps) {
	// TODO VALIDATE PROPS
	if (!props.gridColumnsMap) {
		throw new Error("You must specify gridColumnsMap in order to use the grid view.");
	}

	// execute the transforms in the rows
	const transformedData = useMemo(() => {
		return transformRows(props.data, props.columns);
	}, [props.data, props.columns]);

	const checkboxClick = (i) => () => {
		props.onCheckboxClick(i);
	}

	const allChecked = props.checked.length > 0 && props.checked.every(val => val === true);
	const anyChecked = props.checked.length > 0 && props.checked.some(val => val === true);

	const hasTopRow = props?.bulkActions.length > 0 || props.onSortChange !== undefined;
	const hasSortControl = props.onSortChange !== undefined && props.sort !== undefined;

	// To show the bulkAll header we need bulkActions/rowCount/count, more rows than are visible, at least one registered onAllClick, and all checkboxes selected
	const showBulkAll =
		props.bulkActions?.length > 0 &&
		props.rowCount > 0 &&
		props.count > props.rowCount &&
		props.bulkActions.some(action => action.onAllClick !== undefined) &&
		allChecked
	;

	return (
		<StyledDiv>
			{
				hasTopRow &&
				<div className="topRow">
					<div className="left">
						{
							props?.bulkActions?.length > 0 &&
							<Checkbox
								checked={allChecked}
								onClick={props.onCheckAllClick}
							/>
						}
						{
							props?.bulkActions?.length > 0 && anyChecked &&
							<DataViewBulkActionsButtonsRow
								data={props.data}
								checked={props.checked}
								bulkActions={props.bulkActions}
								checkedAllPages={props.checkedAllPages}
							/>
						}
					</div>
					{
						hasSortControl &&
						<div className="right">
							<DataViewDisplayGridSortControl
								columns={props.columns}
								sort={props.sort}
								onSortChange={props.onSortChange}
							/>
						</div>
					}
				</div>
			}
			{
				showBulkAll &&
				<div className="topRowBulkAll">
					<DataViewBulkAllBar
						rowCount={props.rowCount}
						count={props.count}
						checkedAllPages={props.checkedAllPages}
						onCheckAllPagesClick={props.onCheckAllPagesClick}
					/>
				</div>
			}
			<div className="grid">
				{
					transformedData.map((row, i) => {
						const image = row[props.gridColumnsMap.image] as ReactNode;
						const primary = row[props.gridColumnsMap.primary] as ReactNode;
						const secondary = row[props.gridColumnsMap.secondary] as ReactNode;

						return (
							<div
								className={`
									cell
									${props.checked[i] === true ? "checked" : ""}
								`}
								key={i}
							>
								{
									image &&
									<div className="image">
										{
											props.bulkActions?.length > 0 &&
											<div className="checkboxContainer">
												<div className="mask"/>
												<Checkbox
													className="checkbox"
													checked={props.checked[i] === true}
													onClick={checkboxClick(i)}
												/>
											</div>
										}
										{image}
									</div>
								}
								<div className="info">
									<div className="left">
										{
											primary &&
											<h2>{primary}</h2>
										}
										{
											secondary &&
											<h3>{secondary}</h3>
										}
									</div>
									<div className="right">
										<DataViewActionsButtonRow
											primaryActions={props.primaryActions}
											additionalActions={props.additionalActions}
											originalRowData={ row }
										/>
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
		</StyledDiv>
	)
}

export default DataViewDisplayGrid;
