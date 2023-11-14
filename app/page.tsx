"use client";

import React, {useState} from "react";
import {Layout} from "react-grid-layout";
import {Alert, AlertTitle, Box, Button, Slider, Stack, styled, TextField} from "@mui/material";
import GridLayout from "@/components/GridLayout";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import DoNotTouchIcon from "@mui/icons-material/DoNotTouch";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Wrapper = styled('div')`
  padding: 2em;
  display: flex;
  justify-content: center;

`;

const generateRandomWidget = (index: number, columns: number) => {
    const w = Math.floor(Math.random() * 3) + 1;
    const h = Math.floor(Math.random() * 3) + 1;
    const x = Math.floor(Math.random() * Math.max(1, columns - w + 1));

    return {
        i: `${index}`,
        x,
        y: Math.floor(Math.random() * 5),
        w,
        h,
        isBounded: true,
    };
};

const generateRandomLayout = (count: number, columns: number) => {
    let layout = [];
    for (let i = 0; i < count; i++) {
        layout.push(generateRandomWidget(i, columns));
    }
    return layout;
};

export default function Home() {
    const maxCols = 12;
    const [columns, setColumns] = useState(6);
    const [layout, setLayout] = useState<Layout[]>(generateRandomLayout(100, columns));

    const onAddItemClick = () => {
        setLayout([
            ...layout,
            {i: `${layout.length + 1}`, x: 0, y: 0, w: 2, h: 2},
        ]);
    }

    const onRemoveItem = (i: string) => {
        setLayout(layout.filter(item => item.i !== i));
    }

    const onTogglePinItem = (i: string) => {
        // find item and toggle property static: true
        const item = layout.find(item => item.i === i);
        if (item) {
            item.static = !item.static;
            setLayout([...layout]);
        }
    }

    return (
        <Wrapper>
            <Box sx={{width: 900, p: 8, border: '5px dashed #ccc', borderRadius: 8}}>

                <Alert severity="info" sx={{mb: 2}}>
                    <AlertTitle>How to use</AlertTitle>
                    <p>
                        <DragIndicatorIcon fontSize="small"/> <strong>Drag</strong> the widgets around to reposition them.
                    </p>
                    <p>
                        <strong>Resize</strong> the widgets by dragging the bottom right corner.
                    </p>
                    <p>
                        <AddCircleOutlineIcon fontSize="small"/><strong>Add</strong> a new widget by clicking the button below.
                    </p>
                    <p>
                        <DeleteIcon fontSize="small"/><strong>Remove</strong> a widget by clicking the top right button on the widget.
                    </p>
                    <p>
                        <DoNotTouchIcon fontSize="small"/><strong>Pin</strong> a widget by clicking the top left button on the widget.
                    </p>
                </Alert>

                <div>
                    <Button variant="outlined" startIcon={
                        <AddCircleOutlineIcon/>
                    } onClick={onAddItemClick}>Add Widget</Button>
                </div>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Slider
                        min={1}
                        max={maxCols}
                        step={1}
                        value={[columns]}
                        marks
                        onChange={(_, value) => {
                            setColumns(value[0]);
                        }}
                    />
                    <TextField
                        type="number"
                        label="Columns"
                        value={columns}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Stack>
                <GridLayout
                    layout={layout}
                    columns={columns}
                    onLayoutChange={setLayout}
                    onRemoveItem={onRemoveItem}
                    onTogglePinItem={onTogglePinItem}
                />
            </Box>
        </Wrapper>
    )
}
