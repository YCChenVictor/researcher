import React, { useState } from "react";
import Select from "react-select";
import { useServer } from "./ServerProvider";

interface LinkPageProps {
  self: string;
  parents: string[];
  children: string[];
  allNodes: string[];
}

const LinkPage = ({ self, parents, children, allNodes }: LinkPageProps) => {
  const { serverOn } = useServer();
  const [open, setOpen] = useState(false);
  const [parentState, setParentState] = useState(parents);
  const [childrenState, setChildrenState] = useState(children);
  const [parentTemp, setParentTemp] = useState<string[]>([]);
  const [childrenTemp, setChildrenTemp] = useState<string[]>([]);

  const options = allNodes.map((n) => ({ value: n, label: n }));

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <div>
        <div className="text-lg font-semibold">Parent</div>
        <div className="text-gray-700">
          {parentState.map((p, i) => (
            <div key={i}>
              <a href={p}>{p}</a>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-lg font-semibold">Children</div>
        <div className="text-gray-700">
          {childrenState.map((p, i) => (
            <div key={i}>
              <a href={p}>{p}</a>
            </div>
          ))}
        </div>
      </div>
      {serverOn ? (
        <button
          onClick={() => {
            setParentTemp(parentState);
            setChildrenTemp(childrenState);
            setOpen(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>
      ) : (
        <></>
      )}

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm space-y-4 shadow-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Children
              </label>
              <Select
                isMulti
                options={options}
                value={childrenTemp.map((v) => ({ value: v, label: v }))}
                onChange={(vals) => setChildrenTemp(vals.map((v) => v.value))}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={async () => {
                  const backendUrl = process.env.REACT_APP_BACKEND_URL ?? "";
                  try {
                    await fetch(backendUrl + "/add-links", {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        key: self,
                        parents: parentTemp,
                        children: childrenTemp,
                      }),
                    });
                  } catch (error) {
                    console.log("Error", error);
                  }
                  setParentState(parentTemp);
                  setChildrenState(childrenTemp);
                  setOpen(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkPage;
