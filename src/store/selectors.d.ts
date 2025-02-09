import { RootState } from '../store';
import { Patient } from '../models/PatientModels';
export declare const selectUsers: ((state: {
    patient: import("./patientSlice").PatientState;
    auth: import("./authSlice").AuthState;
    authUser: import("./authUserSlice").AuthUserState;
    apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
}) => import("../models/UserModels").User[]) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: import("./authUserSlice").AuthUserState) => import("../models/UserModels").User[];
    memoizedResultFunc: ((resultFuncArgs_0: import("./authUserSlice").AuthUserState) => import("../models/UserModels").User[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => import("../models/UserModels").User[];
    dependencies: [(state: RootState) => import("./authUserSlice").AuthUserState];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const selectPhysicians: ((state: {
    patient: import("./patientSlice").PatientState;
    auth: import("./authSlice").AuthState;
    authUser: import("./authUserSlice").AuthUserState;
    apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
}) => import("../models/UserModels").User[]) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: import("./authUserSlice").AuthUserState) => import("../models/UserModels").User[];
    memoizedResultFunc: ((resultFuncArgs_0: import("./authUserSlice").AuthUserState) => import("../models/UserModels").User[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => import("../models/UserModels").User[];
    dependencies: [(state: RootState) => import("./authUserSlice").AuthUserState];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const getPatientsLocal: ((state: {
    patient: import("./patientSlice").PatientState;
    auth: import("./authSlice").AuthState;
    authUser: import("./authUserSlice").AuthUserState;
    apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
}) => import("../models/PatientModels").DetailedPatient[]) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: Patient[]) => import("../models/PatientModels").DetailedPatient[];
    memoizedResultFunc: ((resultFuncArgs_0: Patient[]) => import("../models/PatientModels").DetailedPatient[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => import("../models/PatientModels").DetailedPatient[];
    dependencies: [((state: {
        patient: import("./patientSlice").PatientState;
        auth: import("./authSlice").AuthState;
        authUser: import("./authUserSlice").AuthUserState;
        apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
    }) => Patient[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: import("./patientSlice").PatientState) => Patient[];
        memoizedResultFunc: ((resultFuncArgs_0: import("./patientSlice").PatientState) => Patient[]) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => Patient[];
        dependencies: [(state: RootState) => import("./patientSlice").PatientState];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        memoize: typeof import("reselect").weakMapMemoize;
        argsMemoize: typeof import("reselect").weakMapMemoize;
    }];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const getPatientsGoogle: ((state: {
    patient: import("./patientSlice").PatientState;
    auth: import("./authSlice").AuthState;
    authUser: import("./authUserSlice").AuthUserState;
    apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
}) => import("../models/PatientModels").DetailedPatient[]) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: Patient[]) => import("../models/PatientModels").DetailedPatient[];
    memoizedResultFunc: ((resultFuncArgs_0: Patient[]) => import("../models/PatientModels").DetailedPatient[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => import("../models/PatientModels").DetailedPatient[];
    dependencies: [((state: {
        patient: import("./patientSlice").PatientState;
        auth: import("./authSlice").AuthState;
        authUser: import("./authUserSlice").AuthUserState;
        apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
    }) => Patient[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: import("./patientSlice").PatientState) => Patient[];
        memoizedResultFunc: ((resultFuncArgs_0: import("./patientSlice").PatientState) => Patient[]) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => Patient[];
        dependencies: [(state: RootState) => import("./patientSlice").PatientState];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        memoize: typeof import("reselect").weakMapMemoize;
        argsMemoize: typeof import("reselect").weakMapMemoize;
    }];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const getSelectedPatient: ((state: {
    patient: import("./patientSlice").PatientState;
    auth: import("./authSlice").AuthState;
    authUser: import("./authUserSlice").AuthUserState;
    apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
}) => Patient | null) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: Patient | null) => Patient | null;
    memoizedResultFunc: ((resultFuncArgs_0: Patient | null) => Patient | null) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => Patient | null;
    dependencies: [((state: {
        patient: import("./patientSlice").PatientState;
        auth: import("./authSlice").AuthState;
        authUser: import("./authUserSlice").AuthUserState;
        apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
    }) => Patient | null) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: import("./patientSlice").PatientState) => Patient | null;
        memoizedResultFunc: ((resultFuncArgs_0: import("./patientSlice").PatientState) => Patient | null) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => Patient | null;
        dependencies: [(state: RootState) => import("./patientSlice").PatientState];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        memoize: typeof import("reselect").weakMapMemoize;
        argsMemoize: typeof import("reselect").weakMapMemoize;
    }];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const getIsEditing: ((state: {
    patient: import("./patientSlice").PatientState;
    auth: import("./authSlice").AuthState;
    authUser: import("./authUserSlice").AuthUserState;
    apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
}) => boolean) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: boolean) => boolean;
    memoizedResultFunc: ((resultFuncArgs_0: boolean) => boolean) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => boolean;
    dependencies: [((state: {
        patient: import("./patientSlice").PatientState;
        auth: import("./authSlice").AuthState;
        authUser: import("./authUserSlice").AuthUserState;
        apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
    }) => boolean) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: import("./patientSlice").PatientState) => boolean;
        memoizedResultFunc: ((resultFuncArgs_0: import("./patientSlice").PatientState) => boolean) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => boolean;
        dependencies: [(state: RootState) => import("./patientSlice").PatientState];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        memoize: typeof import("reselect").weakMapMemoize;
        argsMemoize: typeof import("reselect").weakMapMemoize;
    }];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const getIsAdding: ((state: {
    patient: import("./patientSlice").PatientState;
    auth: import("./authSlice").AuthState;
    authUser: import("./authUserSlice").AuthUserState;
    apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
}) => boolean) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: boolean) => boolean;
    memoizedResultFunc: ((resultFuncArgs_0: boolean) => boolean) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => boolean;
    dependencies: [((state: {
        patient: import("./patientSlice").PatientState;
        auth: import("./authSlice").AuthState;
        authUser: import("./authUserSlice").AuthUserState;
        apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
    }) => boolean) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: import("./patientSlice").PatientState) => boolean;
        memoizedResultFunc: ((resultFuncArgs_0: import("./patientSlice").PatientState) => boolean) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => boolean;
        dependencies: [(state: RootState) => import("./patientSlice").PatientState];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        memoize: typeof import("reselect").weakMapMemoize;
        argsMemoize: typeof import("reselect").weakMapMemoize;
    }];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const getIsTogglingDelete: ((state: {
    patient: import("./patientSlice").PatientState;
    auth: import("./authSlice").AuthState;
    authUser: import("./authUserSlice").AuthUserState;
    apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
}) => boolean) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: boolean) => boolean;
    memoizedResultFunc: ((resultFuncArgs_0: boolean) => boolean) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => boolean;
    dependencies: [((state: {
        patient: import("./patientSlice").PatientState;
        auth: import("./authSlice").AuthState;
        authUser: import("./authUserSlice").AuthUserState;
        apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
    }) => boolean) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: import("./patientSlice").PatientState) => boolean;
        memoizedResultFunc: ((resultFuncArgs_0: import("./patientSlice").PatientState) => boolean) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => boolean;
        dependencies: [(state: RootState) => import("./patientSlice").PatientState];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        memoize: typeof import("reselect").weakMapMemoize;
        argsMemoize: typeof import("reselect").weakMapMemoize;
    }];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const getShowDeleted: ((state: {
    patient: import("./patientSlice").PatientState;
    auth: import("./authSlice").AuthState;
    authUser: import("./authUserSlice").AuthUserState;
    apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
}) => boolean) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: boolean) => boolean;
    memoizedResultFunc: ((resultFuncArgs_0: boolean) => boolean) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => boolean;
    dependencies: [((state: {
        patient: import("./patientSlice").PatientState;
        auth: import("./authSlice").AuthState;
        authUser: import("./authUserSlice").AuthUserState;
        apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
    }) => boolean) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    } & {
        resultFunc: (resultFuncArgs_0: import("./patientSlice").PatientState) => boolean;
        memoizedResultFunc: ((resultFuncArgs_0: import("./patientSlice").PatientState) => boolean) & {
            clearCache: () => void;
            resultsCount: () => number;
            resetResultsCount: () => void;
        };
        lastResult: () => boolean;
        dependencies: [(state: RootState) => import("./patientSlice").PatientState];
        recomputations: () => number;
        resetRecomputations: () => void;
        dependencyRecomputations: () => number;
        resetDependencyRecomputations: () => void;
    } & {
        memoize: typeof import("reselect").weakMapMemoize;
        argsMemoize: typeof import("reselect").weakMapMemoize;
    }];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const selectPatientDeletedState: (state: RootState, patientId: string) => boolean;
export declare const userIsPhysician: ((state: {
    patient: import("./patientSlice").PatientState;
    auth: import("./authSlice").AuthState;
    authUser: import("./authUserSlice").AuthUserState;
    apiDataSource: import("./apiDataSourceSlice").ApiDataSourceState;
}) => boolean) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (resultFuncArgs_0: import("./authUserSlice").AuthUserState) => boolean;
    memoizedResultFunc: ((resultFuncArgs_0: import("./authUserSlice").AuthUserState) => boolean) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => boolean;
    dependencies: [(state: RootState) => import("./authUserSlice").AuthUserState];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
