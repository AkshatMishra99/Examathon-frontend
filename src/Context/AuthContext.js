import React, { useState, useEffect, createContext } from "react";
import AuthService from "../Services/AuthService";

export const AuthContext = createContext();

export default ({ children }) => {
    // const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [isLoaded, setIsLoaded] = useState();
    const [user, setUser] = useState();
    const [role, setRole] = useState();
    // const [password, setPassword] = useState();
    const [tests, setTests] = useState({
        // classes: {
        //     1: {
        //         maths: [],
        //         science: [],
        //         englishI: [],
        //         englishII: [],
        //         hindiI: [],
        //         hindiII: [],
        //         social: [],
        //         computer: [],
        //     },
        //     2: {
        //         maths: [],
        //         science: [],
        //         englishI: [],
        //         englishII: [],
        //         hindiI: [],
        //         hindiII: [],
        //         social: [],
        //         computer: [],
        //     },
        //     3: {
        //         maths: [],
        //         science: [],
        //         englishI: [],
        //         englishII: [],
        //         hindiI: [],
        //         hindiII: [],
        //         social: [],
        //         computer: [],
        //     },
        //     4: {
        //         maths: [],
        //         science: [],
        //         englishI: [],
        //         englishII: [],
        //         hindiI: [],
        //         hindiII: [],
        //         social: [],
        //         computer: [],
        //     },
        //     5: {
        //         maths: [],
        //         science: [],
        //         englishI: [],
        //         englishII: [],
        //         hindiI: [],
        //         hindiII: [],
        //         social: [],
        //         computer: [],
        //     },
        //     6: {
        //         maths: [],
        //         biology: [],
        //         physics: [],
        //         chemistry: [],
        //         englishI: [],
        //         englishII: [],
        //         hindiI: [],
        //         hindiII: [],
        //         "history/civics": [],
        //         geography: [],
        //         computer: [],
        //     },
        //     7: {
        //         maths: [],
        //         biology: [],
        //         physics: [],
        //         chemistry: [],
        //         englishI: [],
        //         englishII: [],
        //         hindiI: [],
        //         hindiII: [],
        //         "history/civics": [],
        //         geography: [],
        //         computer: [],
        //     },
        //     8: {
        //         maths: [],
        //         biology: [],
        //         physics: [],
        //         chemistry: [],
        //         englishI: [],
        //         englishII: [],
        //         hindiI: [],
        //         hindiII: [],
        //         "history/civics": [],
        //         geography: [],
        //         computer: [],
        //     },
        //     9: {
        //         englishI: [],
        //         englishII: [],
        //         hindiI: [],
        //         hindiII: [],
        //         "history/civics": [],
        //         geography: [],
        //         computer: [],
        //         streams: {
        //             sciences: {
        //                 maths: [],
        //                 biology: [],
        //                 physics: [],
        //                 chemistry: [],
        //             },
        //             commerce: {
        //                 "commercial-applications": [],
        //             },
        //         },
        //     },
        //     10: {
        //         englishI: [],
        //         englishII: [],
        //         hindiI: [],
        //         hindiII: [],
        //         "history/civics": [],
        //         geography: [],
        //         computer: [],
        //         streams: {
        //             sciences: {
        //                 maths: [],
        //                 biology: [],
        //                 physics: [],
        //                 chemistry: [],
        //             },
        //             commerce: {
        //                 "commercial-applications": [],
        //             },
        //         },
        //     },
        // },
        papers: [
            {
                "paper title": "Maths",
                "scheduled on": "12/10/2020 00:00:00",
                "total questions": 1,
                "exam duration": "30",
                "maximum marks": "100",
                "negative marking": "NO",
            },
            {
                "paper title": "Maths",
                "scheduled on": "12/10/2020 00:00:00",
                "total questions": 1,
                "exam duration": "30",
                "maximum marks": "100",
                "negative marking": "NO",
            },
        ],
        students: [],
    });
    useEffect(() => {
        AuthService.isAuthenticated().then((data) => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
            setRole(data.user.role);
        });
    }, []);

    return (
        <div>
            {!isLoaded ? (
                <h1>Loading</h1>
            ) : (
                <AuthContext.Provider
                    value={{
                        user,
                        setUser,
                        isAuthenticated,
                        setIsAuthenticated,
                        role,
                        setRole,
                        tests,
                        setTests,
                    }}
                >
                    {children}
                </AuthContext.Provider>
            )}
        </div>
    );
};
