import React from 'react';
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    button: {
        width: '100%'
    }
}));

const FormElement = (
    {
        name, variant, required, id, label, autoFocus,
        onChange, type, autoComplete, error, helperText,
        margin, multiline, options, optionLabel, value
    }
) => {
    const classes = useStyles();

    const textFieldError = error && error.data.keyPattern && error.data.keyPattern[name];

    let field = (
        <TextField
            margin={margin}
            error={!!textFieldError}
            helperText={textFieldError && helperText}
            autoComplete={autoComplete}
            name={name}
            variant={variant}
            required={required}
            fullWidth
            id={id}
            label={label}
            autoFocus={autoFocus}
            onChange={onChange}
            type={type}
            multiline={multiline}
            value={value}
        />
    )

    if (type === 'image') {
        field = (
            <div className={classes.root}>
                <input
                    accept="image/*"
                    className={classes.input}
                    name={name}
                    onChange={onChange}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" className={classes.button}
                            startIcon={label && <PhotoCamera/>}>
                        {label ? label : <PhotoCamera/>}
                    </Button>

                </label>
            </div>
        )
    }

    if (type === 'autocomplete') {
        field = (
            <Autocomplete
                options={options}
                getOptionLabel={(option) => option[optionLabel]}
                onChange={onChange}
                value={value}
                renderInput={(params) => <TextField {...params} label={label} variant={variant} />}
            />
        )
    }

    return field
};

export default FormElement;