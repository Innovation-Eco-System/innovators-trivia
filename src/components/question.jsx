import React from 'react';
import Answers from './answers';

function statusIndicator(label, index, onAnswer){
    return (
        <div className="flex justify-center">
            <span className="flex-shrink-0 rounded-full bg-white text-primary text-xs tracking-wider font-semibold border-2 border-white border-opacity-20 inline-flex items-center justify-center py-0.5 px-3 transform scale-90 bg-opacity-80">
                {label}
            </span>
        </div>
    );

    // if(status == null)

    // if(!status)
    //     return (
    //         <span className="w-6 h-6 flex-shrink-0 rounded-full bg-red-200 text-black text-xs border border-white font-semibold flex items-center justify-center">
    //             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
    //         </span>
    //     );

    // return (
    //     <span className="w-6 h-6 flex-shrink-0 rounded-full bg-green-200 text-black text-xs border border-white font-semibold flex items-center justify-center">
    //         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
    //     </span>
    // ); 
}

function borderClasses(status){
    if(status == null)
        return "border-white border-opacity-50 bg-white-200 bg-opacity-5";
    else if(status)
        return "border-green-200 bg-green-200 bg-opacity-40";
    else
        return "border-red-200 bg-red-200 bg-opacity-40";
}

export default function Question({
    index, 
    label,
    status, 
    text, 
    type,
    choices,
    open,
    onAnswer
}){
    if(status != null ){
        return (
            <div className={`relative w-full overflow-hidden rounded-md border-2 border-opacity-25 ${borderClasses(status)}`}>
                <div className="flex items-center z-10">
                    { statusIndicator(status, index) }
                    
                    <h5 className="ml-2 text-base text-left text-white text-opacity-80 truncate">
                        {text}
                    </h5>
                </div>
            </div>
        );
    }

    // const activeClass = active ? "" : "pointer-events-none sopacity-0 transform -rotate-12 ";
    const activeClass = open ? "" : "pointer-events-none opacity-0 transform -translate-x-full -rotate-12 ";

    return (
        <div className={`relative w-full overflow-hidden rounded-lg border-2 border-white border-opacity-40 bg-gradient-to-br from-blue-900 via-blue-600 to-blue-900 origin-bottom-left transition duration-500 ${activeClass}`}>
            <div className="">
                <div className="z-10 mt-4 px-4">
                    <div className="px-2">
                        { statusIndicator(label, index) }
                    </div>
                    
                    <div className="mt-2.5 mb-2 px-2">
                        <h5 className="text-4xl leading-snug fancy-font tracking-tight text-center text-white">
                            {text}
                        </h5>
                    </div>
                </div>

                <div className="p-3">
                    <Answers choices={choices} onAnswer={onAnswer} />
                </div>
            </div>
        </div>
    );
}