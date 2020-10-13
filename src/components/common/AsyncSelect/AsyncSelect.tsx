import React, { useState, useEffect, useRef } from "react";
import "./AsyncSelect.scss";
import "../Input/Input.scss";

import { Controller, FieldError } from "react-hook-form";

import Autocomplete from "@material-ui/lab/Autocomplete";

type Props = {
    getOptions: (searchQuery: string) => Promise<OptionType[]>;
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
    className?: string;
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
        className,
    } = props;

    const isCurrent = useRef(true);

    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([] as OptionType[]);
    const [loading, setLoading] = useState(false);

    const getOptions = (searchQuery: string) => {
        setLoading(true);
        setOptions([]);
        props.getOptions(searchQuery).then((options) => {
            if (isCurrent.current) {
                setOptions(options);
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        getOptions("");
        return () => {
            isCurrent.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Controller
            control={control}
            name={name}
            defaultValue={{}}
            render={({ onChange, onBlur, name, value }) => {
                return (
                    <Autocomplete
                        onBlur={onBlur}
                        onChange={({ target }) => {
                            const index = (target as HTMLLIElement).getAttribute(
                                "data-option-index"
                            ) as string;
                            onChange(options[parseInt(index) as number]);
                        }}
                        value={value ? value : null}
                        style={style}
                        open={open}
                        onOpen={() => {
                            setOpen(true);
                        }}
                        onClose={() => {
                            setOpen(false);
                        }}
                        getOptionSelected={(option, value) =>
                            option?.value === value?.value
                        }
                        getOptionLabel={(option) =>
                            option?.name ? option?.name : ""
                        }
                        onInput={({ target }) => {
                            getOptions((target as HTMLInputElement).value);
                        }}
                        options={
                            options.some((el) => el.value === value?.value)
                                ? options
                                : value?.value
                                ? [...options, value]
                                : options
                        }
                        loading={loading}
                        loadingText={"Загружается..."}
                        noOptionsText={"Ничего не найдено."}
                        className={`Maritel__InputContainer ${className}`}
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
                                    <p className="Maritel__Error">
                                        {errorMessage}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                );
            }}
        />
    );
};
export default AsyncSelect;
