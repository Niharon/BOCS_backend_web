const Input = (props) => {

    // const { register } = useForm();

    //    destructuring props and set default value for isRequied
    const { label, isRequied = false, type, registerText ,register, value} = props;

    return (
        <>
            <label className="mb-2.5 block text-black dark:text-white">
                {label}
                {isRequied && <span className="text-meta-1">*</span>}
            </label>

            {/*  if type is textarea then render textarea else render input */}
            {type === "textarea" ? (

                <textarea
                    {...register(registerText)}
                
                    required={isRequied}
                    rows={6}
                    placeholder={label}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
            ) : (
                <input
                    {...register(registerText)}
                    required={isRequied}
                    type={type}
           
                    placeholder={label}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
            )}
        </>
    );
};

export default Input;
