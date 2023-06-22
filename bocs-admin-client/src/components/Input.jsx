const Input = (props) => {

    // const { register } = useForm();

    //    destructuring props and set default value for isRequied
    const { label, isRequied = false, type, registerText, register, value } = props;

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
            ) : type === "image" ? (
                <input
                    {...register(registerText)}
                    required={isRequied}
                    type="file"

                    accept="image/*"

                    placeholder={label}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />

            )
                : type === "file" ? (
                    <input
                        type="file"
                        accept="application/pdf"
                        placeholder={label}
                        {...register(registerText)}
                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                )
                    : (
                        <input
                            {...register(registerText)}
                            required={isRequied}
                            type={type}

                            placeholder={label}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-2 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />
                    )}
        </>
    );
};

export default Input;
