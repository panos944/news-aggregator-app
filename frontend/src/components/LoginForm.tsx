import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import GoogleLoginButton from "./GoogleLoginButton";
import HeroVideo from "./HeroVideo";

interface LoginFormProps {
    onToggleMode: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({onToggleMode}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (!email || !password) {
            setError("Παρακαλώ συμπληρώστε όλα τα πεδία");
            setIsLoading(false);
            return
        }

        try {
            const result = await login(email, password);
            if (!result.success){
                setError(result.message);
            } else {
                // Redirect to home page after successful login
                navigate('/');
            }
        } catch (error) {
            setError('Παρουσιάστηκε σφάλμα. Παρακαλώ δοκιμάστε ξανά.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <HeroVideo>
            <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <div className="mx-auto h-12 w-auto flex justify-center">
                            <span className="text-3xl font-bold">
                                <span className="text-white">Real</span>
                                <span className="text-white mx-1">Group</span>
                                <span className="text-yellow-500">News</span>
                            </span>
                        </div>
                        <h2 className="mt-6 text-center text-3xl font-bold text-white">
                         Σύνδεση στον λογαριασμό σας
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-300">
                            ή{' '}
                            <button 
                            onClick={onToggleMode}
                            className="font-medium text-yellow-500 hover:text-yellow-400 transition-colors">
                                δημιουργήστε νέο λογαριασμό
                            </button>
                        </p>
                    </div>

                    {/* Google Login Button */}
                    <div className="mt-6">
                        <GoogleLoginButton onLoading={setIsGoogleLoading} />
                    </div>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-black bg-opacity-50 text-gray-300">Ή συνεχίστε με</span>
                            </div>
                        </div>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white">
                                    Email
                                </label>
                                <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300
                                placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2
                                focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm bg-white bg-opacity-90"
                                placeholder="Εισάγετε το email σας"/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-white">
                                    Κωδικός
                                </label>
                                <input 
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300
                                placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2
                                focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm bg-white bg-opacity-90"
                                placeholder="Εισάγετε τον κωδικό σας"/>
                            </div>
                        </div>
                        <div>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg bg-opacity-90">
                                    {error}
                                </div>
                            )}
                            <button
                            type="submit"
                            disabled={isLoading}
                            className="group mt-8 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm 
                            font-medium rounded-lg text-blue-900 bg-yellow-500 hover:bg-yellow-400 focus:outline-none
                            focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                {isLoading ? "Σύνδεση..." : "Σύνδεση"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </HeroVideo>
    )
}

export default LoginForm;