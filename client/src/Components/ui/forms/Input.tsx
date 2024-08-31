import { FormGroup, FormLabel, FormControl} from "react-bootstrap";

const Input = ({
                   type,
                   label,
                   name,
                   register,
                   required = false,
                   accept,
                   multiple = false,
                   fileType,
                   errors,
                   placeholder
               }) => {
    if(type === 'file'){
        return (
            <FormGroup>
                <FormLabel>{label}</FormLabel>
                <FormControl
                    type={type}
                    accept={accept}
                    multiple={multiple}
                    {...register(name, { required })}
                />
            </FormGroup>
        )
    } else if(type === 'text' || type === 'email') {
        return (
            <FormGroup>
                <FormLabel>{label}</FormLabel>
                <FormControl
                    type={type}
                    placeholder={placeholder}
                    {...register(name, { required })}
                />
                {errors.name && <div style={{color: 'red'}}>{name} is required</div>}
            </FormGroup>
        )
    }
}

export default Input;