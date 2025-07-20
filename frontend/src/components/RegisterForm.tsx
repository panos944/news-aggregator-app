import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface RegisterFormProps {
    onToggleMode: () => void;
}

const RegisterForm : React.FC<RegisterFormProps> = ({onToggleMode}) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {register} = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
    

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
        setError("Παρακαλώ συμπληρώστε όλα τα πεδία");
        setIsLoading(false);
        return;
    }

    if (formData.password !== formData.confirmPassword) {
        setError("Οι κωδικοί δεν ταιριάζουν")
        setIsLoading(false);
        return
    }

    if (formData.password.length < 6) {
        setError("Ο κωδικός πρέπει να είναι τουλάχιστον 6 χαρακτήρες")
        setIsLoading(false);
        return
    }

    try {
        const result = await register({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        });

        if (!result.success) {
            setError(result.message);
        }
        // If succesfull, the AuthContext will handle the redirect
    } catch (error) {
        setError("Παρουσιάστηκε σφάλμα. Παρακαλώ δοκιμάστε ξανά.")
    } finally {
        setIsLoading(false);
    }
}

    return (
        <>
        <div className="min-h-screen bg-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                        Δημιουργία νέου λογαριασμού
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-300">
                        ή {' '}
                        <button 
                        onClick={onToggleMode}
                        className="font-medium text-yellow-500 hover: text-shadow-yellow-400 transition-colors">
                            συνδεθείτε στον λογαριασμό σας
                        </button>
                    </p>
                </div>

                <form action="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label 
                                htmlFor="firstname"
                                className="block text-sm font-medium text-white">
                                    Όνομα
                                </label>
                                <input 
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500
                                 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 
                                 focus:z-10 sm:text-sm"
                                 placeholder="Όνομα"/>
                            </div>

                            <div>
                                <label 
                                htmlFor="lastName"
                                className="block text-sm font-medium text-white">
                                    Επώνυμο
                                </label>
                                <input 
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500
                                 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 
                                 focus:z-10 sm:text-sm"
                                 placeholder="Επώνυμο"/>
                            </div>
                        </div>

                        <div>
                            <label
                            htmlFor="email"
                            className="block text-sm font-medium text-white">
                                Email
                            </label>
                            <input
                            id="email"
                            name="email"
                            type="text"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500
                            text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 
                            focus:z-10 sm:text-sm"
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
                             value={formData.password}
                             onChange={handleChange}
                             className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500
                             text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 
                             focus:z-10 sm:text-sm"
                             placeholder="Εισάγετε τον κωδικό σας (Τουλάχιστον 6 χαρακτήρες)"/>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
                                Επιβεβαίωση Κωδικού
                            </label>
                            <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="mt-1 appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500
                            text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 
                            focus:z-10 sm:text-sm"
                            placeholder="Επιβεβαιώστε τον κωδικό σας"/>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div>
                        <button 
                        type="submit"
                        disabled={isLoading}
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm mt-6
                        font-medium rounded-lg text-blue-900 bg-yellow-500 hover:bg-yellow-400 focus:outline-none
                        focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                            Δημιουργία λογαριασμού
                        </button>
                    </div>
                </form>
            </div>
        </div>

        </>
    )
}

export default RegisterForm