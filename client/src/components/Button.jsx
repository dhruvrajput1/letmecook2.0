
function Button({children, type="button", bgColor="bg-purple-500", textColor="text-white", className=""}) {

    return (
        <button
        className={`${className} ${type} ${bgColor} ${textColor} hover:scale-110 duration-100 ease-in `}
        >
            {children}
        </button>
    )
}

export default Button;