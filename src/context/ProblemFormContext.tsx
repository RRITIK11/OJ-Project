import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

interface TestcaseInterface {
  id: string;
  input: string;
}

interface ProblemFormInterface {
  lang: string;
  code: string;
  testcases: TestcaseInterface[];
  updateLang: (lang: string) => void;
  updateCode: (code: string) => void;
  addTestcase: (testcase: string) => void;
  deleteTestcase: (id: string) => void;
  updateTestcase: (id: string, testcase: string) => void;
}

const ProblemFormContext = createContext<ProblemFormInterface | undefined>(
  undefined
);

export const ProblemFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lang, setLang] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [testcases, setTestcases] = useState<TestcaseInterface[]>([]);

  const updateLang = (lang: string) => {
    setLang(lang);
  };
  const updateCode = (code: string) => {
    setCode(code);
  };
  const addTestcase = (testcase: string) => {
    if (testcases.length == 6) return;
    setTestcases((prev) => [
      ...prev,
      {
        id: uuid(),
        input: testcase,
      },
    ]);
  };

  const deleteTestcase = (id: string) => {
    if (testcases.length == 1) return;
    setTestcases((prev) => prev.filter((testcase) => testcase.id != id));
  };

  const updateTestcase = (id: string, testcase: string) => {
    setTestcases((prev) =>
      prev.map((prevTestcase) =>
        prevTestcase.id === id
          ? { ...prevTestcase, input: testcase }
          : prevTestcase
      )
    );
  };

  return (
    <ProblemFormContext.Provider
      value={{
        lang,
        code,
        testcases,
        updateLang,
        updateCode,
        addTestcase,
        deleteTestcase,
        updateTestcase,
      }}
    >
      {children}
    </ProblemFormContext.Provider>
  );
};

export const useProblemForm = () => {
    const context = useContext(ProblemFormContext);
    if(!context){
        throw new Error("useProblemForm must be used within a ProblemFormProvider")
    }
    return context
}
