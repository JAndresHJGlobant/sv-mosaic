import * as React from "react";
import { memo, useState, ReactElement, useMemo } from "react";

// Components
import Tooltip from "@root/components/Tooltip";
import Checkbox from "@root/components/Checkbox";
import MobileView from "./Views/MobileView";
import DrawerView from "./Views/DrawerView";
import ResponsiveView from "./Views/ResponsiveView";
import DesktopView from "./Views/DesktopView";

// Types and Utils
import { TopComponentProps } from "./TopComponentTypes";

// Styles
import { StyledHelpIcon, StyledHelpIconWrapper } from "./TopComponent.styled";

const TopComponent = (props: TopComponentProps): ReactElement => {
	const {
		buttons,
		description,
		onCancel,
		showActive,
		title,
		tooltipInfo,
		sections,
		view = "RESPONSIVE",
		sectionsRefs,
		contentRef,
	} = props;

	// State variables
	const [activeChecked, setActiveChecked] = useState(false);
	const [tooltipIsOpen, setTooltipIsOpen] = useState(false);

	const handleCloseTooltip = () => {
		setTooltipIsOpen(false);
	};

	const handleOpenTooltip = () => {
		setTooltipIsOpen(true);
	};

	const handleActiveClick = () => {
		setActiveChecked(!activeChecked);
	};

	const checkbox = useMemo(
		() => (
			<Checkbox
				label="Active"
				checked={activeChecked}
				onClick={handleActiveClick}
			/>
		),
		[activeChecked, handleActiveClick]
	);

	const helpIcon = useMemo(
		() => (
			<StyledHelpIconWrapper
				onClick={() => setTooltipIsOpen(!tooltipIsOpen)}
				showActive={showActive}
				isResponsiveView={view === "RESPONSIVE"}
			>
				<Tooltip
					open={tooltipIsOpen}
					onOpen={handleOpenTooltip}
					onClose={handleCloseTooltip}
					text={tooltipInfo}
				>
					<StyledHelpIcon />
				</Tooltip>
			</StyledHelpIconWrapper>
		),
		[
			showActive,
			view,
			tooltipInfo,
			setTooltipIsOpen,
			tooltipIsOpen,
			handleOpenTooltip,
			handleCloseTooltip,
		]
	);

	const RenderView = () => {
		if (view === "MOBILE")
			return (
				<MobileView
					buttons={buttons}
					title={title}
					description={description}
					helpIcon={helpIcon}
					checkbox={checkbox}
					onCancel={onCancel}
					showActive={showActive}
					tooltipInfo={tooltipInfo}
					view={view}
				/>
			);
		if (view === "DRAWER")
			return (
				<DrawerView
					title={title}
					onCancel={onCancel}
					tooltipInfo={tooltipInfo}
					helpIcon={helpIcon}
					buttons={buttons}
					view={view}
				/>
			);
		if (view === "RESPONSIVE")
			return (
				<ResponsiveView
					title={title}
					description={description}
					showActive={showActive}
					tooltipInfo={tooltipInfo}
					helpIcon={helpIcon}
					checkbox={checkbox}
					buttons={buttons}
					sections={sections}
					view={view}
					sectionsRefs={sectionsRefs}
					contentRef={contentRef}
				/>
			);
		if (view === "DESKTOP" || view === "BIG_DESKTOP")
			return (
				<DesktopView
					sectionsRefs={sectionsRefs}
					title={title}
					description={description}
					showActive={showActive}
					tooltipInfo={tooltipInfo}
					helpIcon={helpIcon}
					checkbox={checkbox}
					buttons={buttons}
					sections={sections}
					view={view}
					contentRef={contentRef}
				/>
			);

		return null;
	};

	return <RenderView />;
};

export default memo(TopComponent);
