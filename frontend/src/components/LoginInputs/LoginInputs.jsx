const LoginInputs = () => {

    const handleInputs = (e) => {
        const val = e.target.value;
        e.target.classList.toggle('filled', val !== '');
    }

    return (
        <>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    inputMode="email"
                    id="email"
                    name="email"
                    required
                    onInput={(e) => handleInputs(e)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    onInput={(e) => handleInputs(e)}
                />
            </div>
        </>
    );
};

export default LoginInputs;