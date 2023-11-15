"use client";

import React from 'react';
import RGL, {Layout, WidthProvider} from 'react-grid-layout';
import {Card, IconButton, styled} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PushPinIcon from '@mui/icons-material/PushPin';

type GripWrapperProps = {
    width: number;
}

const GridWrapper = styled('div')<GripWrapperProps>`
  width: ${(props) => props.width}px;
  border-radius: 25px;
  border: 2px dot-dash #ccc;
`;


type GridLayoutItemProps = {
    pinned?: boolean;
}
const GridLayoutItem = styled(Card)<GridLayoutItemProps>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: ${({theme, pinned}) => pinned ? '#ccc' : theme.palette.primary.main};
  color: ${({theme}) => theme.palette.primary.contrastText};
`;

const ReactGridLayout = WidthProvider(RGL);

type Props = {
    columns: number;
    layout: Layout[];
    isEditMode?: boolean;
    preventCollision?: boolean;
    onLayoutChange?: (layout: Layout[]) => void;
    onRemoveItem?: (i: string) => void;
    onTogglePinItem?: (i: string) => void;
};

const GridLayout = ({columns, layout, isEditMode, preventCollision, onLayoutChange, onRemoveItem, onTogglePinItem}: Props) => {
    const gridWidthInPx = 800;

    return (
        <GridWrapper width={gridWidthInPx}>
            <ReactGridLayout
                className="layout"
                layout={layout}
                cols={columns}
                isDraggable={isEditMode}
                isResizable={isEditMode}
                preventCollision={preventCollision}
                verticalCompact={!preventCollision}
                rowHeight={gridWidthInPx / columns}
                // margin={[0, 0]}
                width={gridWidthInPx}
                draggableHandle=".drag-handle"
                isBounded
                isDroppable={true} // needed to allow dropping items from outside
                onDrop={(layout, layoutItem, _event) => {
                    alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`);
                }}
                onLayoutChange={(newLayout) => onLayoutChange?.(newLayout)}
            >
                {layout.map((item) => (
                        <GridLayoutItem key={item.i} pinned={item.static}>
                            {isEditMode && (
                                <>
                                    <IconButton
                                        className="drag-handle"
                                        sx={{position: 'absolute', top: 0, left: 0, cursor: 'move'}}
                                        aria-label="delete"
                                        size="small"
                                    >
                                        <DragIndicatorIcon fontSize="small"/>
                                    </IconButton>
                                    <IconButton
                                        sx={{position: 'absolute', top: 0, right: 0}}
                                        aria-label="delete"
                                        size="small"
                                        onClick={() => onRemoveItem?.(item.i)}
                                    >
                                        <DeleteIcon fontSize="small"/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => onTogglePinItem?.(item.i)}
                                    >
                                        <PushPinIcon fontSize="small"/>
                                    </IconButton>
                                </>
                            )}
                            {item.w}:{item.h}
                        </GridLayoutItem>
                    )
                )}
            </ReactGridLayout>
        </GridWrapper>
    );
};

export default GridLayout;
