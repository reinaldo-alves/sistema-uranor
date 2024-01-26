import Autocomplete from '@mui/material/Autocomplete';

interface IProps {
    default: any,
    label: (option: any) => string,
    disabled?: boolean,
    disabledOptions?: (option: any) => boolean,
    options: Array<any>,
    equality: (option: any, value: any) => boolean,
    inputValue: any,
    setInputValue: React.Dispatch<React.SetStateAction<any>>
    value: any,
    setValue: React.Dispatch<React.SetStateAction<any>>
}

function AutocompleteInput(props: IProps) {

    return (
        <Autocomplete
            value={props.value}
            disabled={props.disabled}
            defaultValue={props.default}
            noOptionsText="- Não encontrado -"
            getOptionDisabled={props.disabledOptions}
            onChange={(event, newValue) => {
                props.setValue(newValue);
            }}
            inputValue={props.inputValue}
            onInputChange={(event, newInputValue) => {
                props.setInputValue(newInputValue);
            }}
            getOptionLabel={props.label}
            isOptionEqualToValue={props.equality}
            fullWidth={true}
            loading={props.options.length === 0}
            loadingText="Carregando..."
            options={[props.default, ...props.options]}
            renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                    <input type="text" {...params.inputProps} />
                </div>
            )}
        />
    )
}

export default AutocompleteInput