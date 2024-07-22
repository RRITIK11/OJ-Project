import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ProblemDescription from "./ProblemDescription";

export default function ProblemEditor({ className }: any) {
  return (
    <div className={className}>
      <ResizablePanelGroup direction="horizontal" className="rounded-lg  gap-1">
        <ResizablePanel
          defaultSize={50}
          className=" border-2 border-white rounded-[4px] overflow-hidden"
        >
          <ProblemDescription />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel defaultSize={50} className="overflow-scroll">
          <ResizablePanelGroup direction="vertical" className="gap-1">
            <ResizablePanel
              defaultSize={40}
              className=" rounded-[4px] border-2 border-white overflow-scroll h-[100%]"
            >
              <div className="">code editor
              <div className="text-white">
                <li>hello i am under the water1</li>
                <li>hello i am under the water2</li>
                <li>hello i am under the water3</li>
                <li>hello i am under the water4</li>
                <li>hello i am under the water5</li>
                <li>hello i am under the water7</li>
                <li>hello i am under the water</li>
                <li>hello i am under the water</li>
                <li>hello i am under the water</li>
                <li>hello i am under the water</li>
                
              </div>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel
              defaultSize={10}
              className="rounded-[4px] border-2 border-white bg-yellow-50 h-[50px] overflow-scroll"
            >
              <div className="text-black">
                
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
