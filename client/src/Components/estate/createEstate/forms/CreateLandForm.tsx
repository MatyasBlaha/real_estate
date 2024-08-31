import AddressInputGroup from "../Components/inputGroups/AdressInputGroup.tsx";
import PricingInputGroup from "../Components/inputGroups/PricingInputGrpup.tsx";

const CreateLandForm = ({isSell, isRent, register, errors}) => {

    if(!(isSell || isRent)){
        return null;
    }

    return (
        <div>

            <div>
                {isSell ? (
                    <h2>sell</h2>
                ) : (
                    <h2>rent</h2>
                )}
            </div>



            <AddressInputGroup register={register} errors={errors} />
            <PricingInputGroup register={register} errors={errors}  />

        </div>
    )
}

export default CreateLandForm;