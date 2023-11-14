"use client";

import React, {useState} from "react";
import {Layout} from "react-grid-layout";
import {Alert, AlertTitle, Box, Button, Card, Slider, Stack, styled, TextField, Typography} from "@mui/material";
import GridLayout from "@/components/GridLayout";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PushPinIcon from "@mui/icons-material/PushPin";

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
        setLayout(prevLayout =>
            prevLayout.map(item => {
                if (item.i === i) {
                    return {...item, static: !item.static};
                }
                return item;
            })
        );
    }

    return (
        <Wrapper>
            <Stack justifyContent="center" alignItems="center"
                   sx={{width: 950, p: 8, border: '5px dashed #ccc', borderRadius: 8}}>

                <Alert severity="info" sx={{mb: 2, lineHeight: 2}}>
                    <AlertTitle>How to use</AlertTitle>
                    <p>
                        <DragIndicatorIcon fontSize="small" sx={{verticalAlign: 'middle'}}/> <strong>Drag</strong> the
                        widgets around to reposition them.
                    </p>
                    <p>
                        <strong>Resize</strong> the widgets by dragging the bottom right corner.
                    </p>
                    <p>
                        <AddCircleOutlineIcon fontSize="small" sx={{verticalAlign: 'middle'}}/><strong>Add</strong> a
                        new widget by clicking the button below.
                    </p>
                    <p>
                        <DeleteIcon fontSize="small" sx={{verticalAlign: 'middle'}}/><strong>Remove</strong> a widget by
                        clicking the top right button on the widget.
                    </p>
                    <p>
                        <PushPinIcon fontSize="small" sx={{verticalAlign: 'middle'}}/><strong>Pin</strong> a widget by
                        clicking the top left button on the widget.
                    </p>
                </Alert>
                <Card sx={{width: '100%', p: 2}}>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{width: '100%'}}>
                        <Button variant="outlined" startIcon={
                            <AddCircleOutlineIcon/>
                        } onClick={onAddItemClick}>Add Widget</Button>
                        <Slider
                            min={1}
                            max={maxCols}
                            step={1}
                            value={[columns]}
                            marks
                            onChange={(_, newValue) => {
                                if (Array.isArray(newValue)) {
                                    setColumns(newValue[0]);
                                }
                            }}
                        />
                        <TextField
                            type="number"
                            label="Columns"
                            value={columns}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => {
                                const newColumns = Number(e.target.value);
                                if (newColumns >= 1 && newColumns <= maxCols) {
                                    setColumns(newColumns);
                                }

                            }}
                        />
                    </Stack>
                </Card>
                <GridLayout
                    layout={layout}
                    columns={columns}
                    onLayoutChange={setLayout}
                    onRemoveItem={onRemoveItem}
                    onTogglePinItem={onTogglePinItem}
                />
            </Stack>
        </Wrapper>
    )
}
