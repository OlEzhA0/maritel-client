import React, { useState } from "react";
import "../AsyncSelect/AsyncSelect.scss";
import "../Input/Input.scss";

import { Controller, FieldError } from "react-hook-form";

import Autocomplete, {
    createFilterOptions,
} from "@material-ui/lab/Autocomplete";

type Props = {
    onSelect?: (selectedValue: OptionType) => void;
    label?: string;
    name: string;
    placeholder?: string;
    disabled?: boolean;
    disabledMessage?: string;
    required?: boolean;
    style?: { [x: string]: string | number };
    control: any;
    error?: FieldError;
    errorMessage?: string;
    options: OptionType[];
    returnValue?: boolean;
};

export const Select = (props: Props) => {
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
        options,
        returnValue,
    } = props;

    const filterOptions = createFilterOptions<OptionType>({
        limit: 6,
    });

    const [open, setOpen] = useState(false);
    const [inputData, setInputData] = useState({ value: "", input: "" });

    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ onChange, onBlur, name, value }) => (
                <Autocomplete
                    onBlur={onBlur}
                    onChange={({ target }) => {
                        const index = (target as HTMLLIElement).getAttribute(
                            "data-option-index"
                        ) as string;
                        if (returnValue) {
                            onChange(options[parseInt(index) as number].value);
                        } else {
                            onChange(options[parseInt(index) as number]);
                        }
                    }}
                    value={
                        returnValue
                            ? options.find(
                                  (option) => option.value === value.toString()
                              )
                                ? options.find(
                                      (option) =>
                                          option.value === value.toString()
                                  )
                                : null
                            : value
                            ? value
                            : null
                    }
                    style={style}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    getOptionSelected={(option, value) => {
                        return option?.value === value?.value;
                    }}
                    getOptionLabel={(option) =>
                        option?.name ? option.name : ""
                    }
                    onInput={({ target }) => {
                        setInputData({
                            ...inputData,
                            input: (target as HTMLInputElement).value,
                        });
                    }}
                    filterOptions={filterOptions}
                    options={options}
                    noOptionsText={"Ничего не найдено."}
                    className="Maritel__InputContainer"
                    disabled={disabled}
                    data-tip={disabled ? disabledMessage : ""}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                            {label && (
                                <label>
                                    {label}{" "}
                                    {required && (
                                        <span className="Maritel__Required">
                                            *
                                        </span>
                                    )}
                                </label>
                            )}

                            <input
                                type="text"
                                placeholder={placeholder}
                                {...params.inputProps}
                                className={`Maritel__Input ${
                                    error && "Maritel__InputError"
                                }`}
                                name={name}
                            />
                            {error && (
                                <p className="Maritel__Error">{errorMessage}</p>
                            )}
                        </div>
                    )}
                />
            )}
        />
    );
};
