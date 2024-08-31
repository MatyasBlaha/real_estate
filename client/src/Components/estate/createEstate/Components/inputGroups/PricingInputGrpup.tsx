import React from "react";
import Input from "../../../../ui/forms/Input.tsx";


const PricingInputGroup = ({register, errors}) => {
    return (
        <>

            <Input
                type="text"
                name="street"
                label="Street"
                register={register}
                placeholder="Enter street"
                errors={errors}
            />

        </>
    )
}

export default PricingInputGroup