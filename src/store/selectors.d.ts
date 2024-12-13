import { RootState } from '../store';
import { Patient } from '../models/PatientModels';
export declare const getPatients: ((state: import("../store").PatientState) => import("../models/PatientModels").DetailedPatient[]) & {
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
    dependencies: [(state: RootState) => Patient[]];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const getSelectedPatient: ((state: import("../store").PatientState) => Patient | null) & {
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
    dependencies: [(state: RootState) => Patient | null];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const getIsEditing: ((state: import("../store").PatientState) => boolean) & {
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
    dependencies: [(state: RootState) => boolean];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
export declare const getIsAdding: ((state: import("../store").PatientState) => boolean) & {
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
    dependencies: [(state: RootState) => boolean];
    recomputations: () => number;
    resetRecomputations: () => void;
    dependencyRecomputations: () => number;
    resetDependencyRecomputations: () => void;
} & {
    memoize: typeof import("reselect").weakMapMemoize;
    argsMemoize: typeof import("reselect").weakMapMemoize;
};
