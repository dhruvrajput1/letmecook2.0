import { useForm } from "react-hook-form";
import Input from "../Input";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    
    const search = (data) => {
        const query = data?.query;
        navigate(`/search/${query}`);
    }
    

    return (
        <>
            <form onSubmit={handleSubmit(search)}>
                <Input 
                    placeholder="Search"
                    {...register("query", {required: true})}
                />
            </form>
        </>
    )
}