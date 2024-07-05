import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, userLogin } from "../store/Slices/authSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../skeleton/LoginSkeleton";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const loading = useSelector(state => state.auth?.loading);

    console.log("loading", loading);

    const submit = async (data) => {
        // check if user entered email or username
        const isEmail = data.username.includes("@");

        console.log("data", data)

        const loginData = { // if not working check here
            email: isEmail? data.username : "",
            username: !isEmail? data.username : "",
            password: data.password,
        }

        const response = await dispatch(userLogin(loginData));
        console.log("response", response)
        const user = await dispatch(getCurrentUser());
        if (user && response.payload) {
            navigate("/");
        }

    };

    if(loading) {
        return <LoginSkeleton />
    }

    return (
        <>
            <div className="w-full h-screen text-white p-3 flex justify-center items-start">
                <div className="flex max-w-5xl flex-col space-y-5 justify-center items-center border border-slate-600 p-3 mt-20">
                    <div className="flex items-center gap-2 mt-5">
                        <Logo />
                    </div>

                    <form
                        onSubmit={handleSubmit(submit)}
                        className="space-y-5 p-2"
                    >
                        <Input
                            label="Enter Username or Email : "
                            type="text"
                            placeholder="example@gmail.com"
                            {...register("username", {
                                required: "username is required",
                            })}
                        />
                        {errors.username && (
                            <span className="text-red-500">
                                {errors.username.message}
                            </span>
                        )}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Your Password"
                            {...register("password", {
                                required: "password is required",
                            })}
                        />
                        {errors.password && (
                            <span>{errors.password.message}</span>
                        )}

                        <Button
                            type="submit"
                            bgColor="bg-purple-500"
                            className="w-full sm:py-3 py-2 hover:bg-purple-700 text-lg"
                        >
                            Login
                        </Button>

                        <p className="text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <Link
                                to={"/signup"}
                                className="text-purple-600 cursor-pointer hover:opacity-70"
                            >
                                SignUp
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;