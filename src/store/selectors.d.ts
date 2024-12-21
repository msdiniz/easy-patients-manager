import { RootState } from '../store';
import { Patient } from '../models/PatientModels';
export declare const getPatients: ((state: {
    patient: import("./patientSlice").PatientState;
    auth: import("./authSlice").AuthState;
}) => import("../models/PatientModels").DetailedPatient[]) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (...resultFuncArgs: any) => import("../models/PatientModels").DetailedPatient[];
    memoizedResultFunc: ((...resultFuncArgs: any) => import("../models/PatientModels").DetailedPatient[]) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => import("../models/PatientModels").DetailedPatient[];
    dependencies: [(state: RootState) => any];
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
}) => Patient | null) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (...resultFuncArgs: any) => Patient | null;
    memoizedResultFunc: ((...resultFuncArgs: any) => Patient | null) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => Patient | null;
    dependencies: [(state: RootState) => any];
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
}) => boolean) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (...resultFuncArgs: any) => boolean;
    memoizedResultFunc: ((...resultFuncArgs: any) => boolean) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => boolean;
    dependencies: [(state: RootState) => any];
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
}) => boolean) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (...resultFuncArgs: any) => boolean;
    memoizedResultFunc: ((...resultFuncArgs: any) => boolean) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => boolean;
    dependencies: [(state: RootState) => any];
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
}) => boolean) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (...resultFuncArgs: any) => boolean;
    memoizedResultFunc: ((...resultFuncArgs: any) => boolean) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => boolean;
    dependencies: [(state: RootState) => any];
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
}) => boolean) & {
    clearCache: () => void;
    resultsCount: () => number;
    resetResultsCount: () => void;
} & {
    resultFunc: (...resultFuncArgs: any) => boolean;
    memoizedResultFunc: ((...resultFuncArgs: any) => boolean) & {
        clearCache: () => void;
        resultsCount: () => number;
        resetResultsCount: () => void;
    };
    lastResult: () => boolean;
    dependencies: [(state: RootState) => any];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
