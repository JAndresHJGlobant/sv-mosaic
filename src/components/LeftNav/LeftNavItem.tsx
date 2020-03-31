import * as React from "react";
import { useRef, Fragment, useContext } from "react";
import styled from "styled-components";

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { LeftNavBlockProps, LeftNavContext } from "./LeftNavTypes";
import LeftNavFlyout from "./LeftNavFlyout";
import { BodyText } from "../Typography";
import theme from "../../theme";

const StyledA = styled.a`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 16px;
	color: ${theme.colors.gray200};

	&.clickable {
		cursor: pointer;
	}

	&.hasItems > .right > .arrow {
		visibility: visible;
	}

	&:hover {
		background: #505057;
	}

	& > .left {
		display: flex;
		align-items: center;
		flex: 1 1 0;
		margin-right: 10px;
	}

	& > .left > .icon {
		margin-right: 16px;
	}

	& > .left > .navLabel {
		color: ${theme.colors.gray200};
	}

	& > .right {
		display: flex;
		align-items: center;
		flex: 0 0 auto;
	}

	& > .right > * {
		font-size: 20px;
		visibility: hidden;
	}
`;

function LeftNavItem(props: LeftNavBlockProps) {
	const {
		openAnchorEl,
		item,
		onOpen
	} = props;

	const leftNavContext = useContext(LeftNavContext);
	const aRef = useRef(null);

	const open = aRef.current !== null && openAnchorEl === aRef.current;

	const onNav = function() {
		leftNavContext.onNav({ item });
	}

	const onMouseEnter = function(e) {
		onOpen(e.currentTarget);
	}

	const clickable = !item.items;
	const hasItems = item.items !== undefined;

	return (
		<Fragment>
			<StyledA
				onMouseEnter={onMouseEnter}
				onClick={clickable ? onNav : undefined}
				ref={aRef}
				className={`
					${clickable ? "clickable" : ""}
					${hasItems ? "hasItems" : ""}
				`}
			>
				<span className="left">
					{
						item.mIcon &&
						<item.mIcon className="icon"/>
					}
					<BodyText className="navLabel">{item.label}</BodyText>
				</span>
				<span className="right">
					<ChevronRightIcon className="arrow"/>
				</span>
			</StyledA>
			{
				item.items && open &&
				<LeftNavFlyout
					parent={item}
					anchorEl={aRef.current}
				/>
			}
		</Fragment>
	)
}

export default LeftNavItem;