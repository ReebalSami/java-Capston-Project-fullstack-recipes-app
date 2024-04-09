import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {SyntheticEvent, useState} from "react";
import {RecipeDifficulty} from "../types/RecipeDifficulty.ts";

const options = Object.values(RecipeDifficulty);
type DifficultySelectProps = {
    handleDifficulty: (event: SyntheticEvent<Element, Event>, value: RecipeDifficulty | null) => void;
}
export default function DifficultySelect(props: Readonly<DifficultySelectProps>) {
    const [value, setValue] = useState<RecipeDifficulty | null>(null);

    return (
        <div>
            <Autocomplete
                value={value}
                onChange={(event, value) => {
                    setValue(value);
                    props.handleDifficulty(event, value);}}
                id="recipe-difficulty-select-demo"
                options={options}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Difficulty" />}
            />
        </div>
    );
}
