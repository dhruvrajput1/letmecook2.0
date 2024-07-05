import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Input from "../Input";
import Button from "../Button";
import { IoIosSearch } from "react-icons/io";

export default function SearchForSmallScreen({open, setOpenSearch}) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const search = (data) => {
        const query = data?.query;
        navigate(`/search/${query}`);
        setOpenSearch((prev) => !prev);
    }

    return (
        <>
            {open && 
                <div className="fixed bg-black bg-opacity-90 z-50 inset-0 h-screen w-full flex items-start justify-start">
                    <div className="sm:p-8 p-4 relative w-full">
                        <div className="absolute top-5 right-5">
                            <IoIosSearch 
                                size={30}
                                onClick={() => setOpenSearch((prev) => !prev)}
                            />
                        </div>
                        <form
                            onSubmit={handleSubmit(search)}
                            className="flex items-center mt-10"
                        >
                            <Input
                                type="text"
                                placeholder="Search"
                                className="px-4 py-2 border border-gray-300 focus:outline-none"
                                {...register("query", { required: true })}
                            />
                            <Button
                                type="submit"
                                className="px-4 py-2 bg-purple-500 text-white font-semibold hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Search
                            </Button>
                        </form>
                    </div>
                </div>
            }
        </>
    )
    
}