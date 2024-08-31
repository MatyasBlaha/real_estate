import AddressInputGroup from "../Components/inputGroups/AdressInputGroup.tsx";

const CreateHouseForm = ({isSell, isRent, register, errors}) => {


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
        </div>
    )
}

export default CreateHouseForm;