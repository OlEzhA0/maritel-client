import React, { useState, useEffect } from "react";
import "./AsyncSelect.scss";

import { Controller } from "react-hook-form";

import Autocomplete from "@material-ui/lab/Autocomplete";

type Props = {
    getOptions: (
        searchQuery: string
    ) => Promise<{ name: string; value: string }[]>;
    onSelect?: (selectedValue: { name: string; value: string }) => void;
    label?: string;
    name: string;
    placeholder?: string;
    disabled?: boolean;
    disabledMessage?: string;
    required?: boolean;
    style?: { [x: string]: string | number };
    control: any;
    error?: boolean;
    errorMessage?: string;
};

const AsyncSelect = (props: Props) => {
    const {
        label,
        name,
        placeholder,
        disabled,
        disabledMessage,
        required,
        style,
        control,
        error,
        errorMessage,
    } = props;

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([] as any[]);
    const [inputData, setInputData] = useState({ value: "", input: "" });
    const [loading, setLoading] = useState(false);

    const getOptions = (searchQuery: string) => {
        setLoading(true);
        setOptions([]);
        props.getOptions(searchQuery).then((options) => {
            setOptions(options);
            setLoading(false);
        });
    };

    useEffect(() => {
        getOptions("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getOptions(inputData.input);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.getOptions, inputData.input]);

    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ onChange, onBlur, name }) => (
                <Autocomplete
                    onBlur={onBlur}
                    onChange={({ target }) => {
                        const index = (target as HTMLLIElement).getAttribute(
                            "data-option-index"
                        ) as string;
                        onChange(options[parseInt(index) as number]);
                    }}
                    style={style}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    getOptionSelected={(option, value) =>
                        option.name === value.name
                    }
                    getOptionLabel={(option) => option.name}
                    onInput={({ target }) => {
                        setInputData({
                            ...inputData,
                            input: (target as HTMLInputElement).value,
                        });
                    }}
                    options={options}
                    loading={loading}
                    loadingText={
                        inputData.input ? "Загружается..." : "Начните вводить"
                    }
                    noOptionsText={"Ничего не найдено."}
                    className="CartPage__InputContainer"
                    disabled={disabled}
                    data-tip={disabled ? disabledMessage : ""}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                            {label && (
                                <label>
                                    {label}{" "}
                                    {required && (
                                        <span className="CartPage__Required">
                                            *
                                        </span>
                                    )}
                                </label>
                            )}

                            <input
                                type="text"
                                placeholder={placeholder}
                                {...params.inputProps}
                                className={`CartPage__Input ${
                                    error && "CartPage__InputError"
                                }`}
                                name={name}
                            />
                            {error && (
                                <p className="CartPage__Error">
                                    {errorMessage}
                                </p>
                            )}
                        </div>
                    )}
                />
            )}
        />
    );
};
export default AsyncSelect;
