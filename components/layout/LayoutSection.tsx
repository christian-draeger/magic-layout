import React, {useEffect, useState} from "react";
import {Layout} from "react-grid-layout";
import {Alert, AlertTitle, Button, Card, Slider, Stack, styled, TextField} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import PivotTableChartIcon from "@mui/icons-material/PivotTableChart";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import ShuffleIcon from '@mui/icons-material/Shuffle';
import GridLayout from "@/components/layout/GridLayout";

const readPersistedLayout = (): Layout[] | null => {
    const layout = localStorage.getItem('layout');
    return JSON.parse(layout);
}

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

const initialLayout = () => readPersistedLayout() || generateRandomLayout(20, 6);

const LayoutSection = () => {
    const maxCols = 12;
    const [columns, setColumns] = useState(6);
    const [layout, setLayout] = useState<Layout[]>(initialLayout());
    const [isEditMode, setIsEditMode] = useState(false);
    const [isPreventCollision, setIsPreventCollision] = useState(false);

    const onAddItemClick = () => {
        setLayout([
            ...layout,
            {i: `${layout.length + 1}`, x: 0, y: -1, w: 2, h: 2},
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

    useEffect(() => {
        localStorage.setItem('layout', JSON.stringify(layout));
    }, [layout]);

    return (
        <Stack padding={2} width={'100%'}>
            <h2>Layout Editor</h2>
            <Stack justifyContent="center" alignItems="center">
                <Card sx={{width: '100%', p: 2}}>
                    <Stack direction="row" spacing={2} sx={{pb: 2}}>
                        <Button variant="outlined" startIcon={
                            <AddCircleOutlineIcon/>
                        } onClick={onAddItemClick}>Add Widget
                        </Button>
                        <Button variant={isEditMode ? "contained" : "outlined"} startIcon={
                            <PivotTableChartIcon/>
                        } onClick={() => setIsEditMode(!isEditMode)}>Rearrange Widgets
                        </Button>
                        <Button disabled={!isEditMode} variant={isPreventCollision ? "contained" : "outlined"} startIcon={
                            <SettingsOverscanIcon/>
                        } onClick={() => setIsPreventCollision(!isPreventCollision)}>Prevent Collision
                        </Button>
                        <Button variant="outlined" startIcon={
                            <ShuffleIcon/>
                        } onClick={() => setLayout(generateRandomLayout(20, columns))}>Regenerate Layout
                        </Button>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{width: '100%'}}>
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
                    isEditMode={isEditMode}
                    preventCollision={isPreventCollision}
                    onLayoutChange={setLayout}
                    onRemoveItem={onRemoveItem}
                    onTogglePinItem={onTogglePinItem}
                />
            </Stack>
        </Stack>
    )
}

export default LayoutSection;
