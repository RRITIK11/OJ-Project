import { VerdictInterface } from "@/app/api/run/[problemName]/route";
import { ResultInterface } from "@/app/api/submit/[problemName]/route";
import { Language, sampleCode } from "@/config/constants";
import { ProblemInterface } from "@/models/problem.model";
import axios from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuid } from "uuid";

interface TestcaseInterface {
  id: string;
  input: string;
}

interface ProblemFormInterface {
  lang: Language;
  code: string;
  testcases: TestcaseInterface[];
  customOutput: VerdictInterface[] | undefined;
  result: ResultInterface | undefined;
  isAvailable: boolean;
  loadingResult: boolean;
  showResult: boolean;
  problem: ProblemInterface | undefined;
  setProblem: Dispatch<SetStateAction<ProblemInterface | undefined>>;
  setShowResult: Dispatch<SetStateAction<boolean>>;
  setLoadingResult: Dispatch<SetStateAction<boolean>>;
  setIsAvailable: Dispatch<SetStateAction<boolean>>;
  setCustomOutput: Dispatch<SetStateAction<VerdictInterface[] | undefined>>;
  setResult: Dispatch<SetStateAction<ResultInterface | undefined>>;
  updateLang: (lang: Language) => void;
  updateCode: (code: string) => void;
  addTestcase: () => void;
  deleteTestcase: (id: string) => void;
  updateTestcase: (id: string, input: string) => void;
  resultWindow: "testcase" | "testresult" | "verdict";
  setResultWindow: Dispatch<
    SetStateAction<"testcase" | "testresult" | "verdict">
  >;
}

const ProblemFormContext = createContext<ProblemFormInterface | undefined>(
  undefined
);

export const ProblemFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState<Language>(Language.Cpp);
  const [code, setCode] = useState<string>(sampleCode[lang]);
  const [problem, setProblem] = useState<ProblemInterface | undefined>(
    undefined
  );
  const [testcases, setTestcases] = useState<TestcaseInterface[]>([]);
  const [customOutput, setCustomOutput] = useState<
    VerdictInterface[] | undefined
  >();
  const [result, setResult] = useState<ResultInterface | undefined>();
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const [loadingResult, setLoadingResult] = useState<boolean>(false);
  const [showResult, setShowResult] = useState(false);
  const [resultWindow, setResultWindow] = useState<
    "testcase" | "testresult" | "verdict"
  >("testcase");

  const updateLang = (lang: Language) => {
    setLang(lang);
    setCode(sampleCode[lang])
  };
  const updateCode = (code: string) => {
    setCode(code);
  };
  const addTestcase = () => {
    if (testcases.length == 6) return;
    setTestcases((prev) => [
      ...prev,
      {
        id: uuid(),
        input: "",
      },
    ]);
  };

  const deleteTestcase = (id: string) => {
    if (testcases.length == 1) return;
    setTestcases((prev) => prev.filter((testcase) => testcase.id != id));
  };

  const updateTestcase = (id: string, input : string) => {
    setTestcases((prev) =>
      prev.map((prevTestcase) =>
        prevTestcase.id === id
          ? { ...prevTestcase, input }
          : prevTestcase
      )
    );
  };

  useEffect(() => {
    if (problem && problem.testCases) {
      const visibleTestCases = problem.testCases.filter((testcase) => (testcase.visible===true)).map((testcase)=>{
        return {
          id : uuid(),
          input : testcase.input,
        }
      });
      setTestcases(visibleTestCases);
    }
  }, [problem]);

  return (
    <ProblemFormContext.Provider
      value={{
        lang,
        code,
        testcases,
        customOutput,
        result,
        isAvailable,
        loadingResult,
        showResult,
        problem,
        setProblem,
        setShowResult,
        setLoadingResult,
        setIsAvailable,
        setResult,
        setCustomOutput,
        updateLang,
        updateCode,
        addTestcase,
        deleteTestcase,
        updateTestcase,
        resultWindow,
        setResultWindow,
      }}
    >
      {children}
    </ProblemFormContext.Provider>
  );
};

export const useProblemForm = () => {
  const context = useContext(ProblemFormContext);
  if (!context) {
    throw new Error("useProblemForm must be used within a ProblemFormProvider");
  }
  return context;
};
