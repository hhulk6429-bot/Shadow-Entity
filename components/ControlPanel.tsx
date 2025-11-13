
import React, { useState } from 'react';

interface ControlPanelProps {
    onProcessText: (text: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onProcessText }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onProcessText(text);
        setText('');
    };

    return (
        <div className="p-4 space-y-6">
            <div className="border border-gray-700 rounded-lg p-6 bg-gray-800/30">
                <h2 className="text-xl font-bold text-cyan-300 mb-4">إدخال نصوص جديدة (Input New Text)</h2>
                <p className="text-gray-400 mb-4 text-sm">
                    أدخل نصًا ليتم استيعابه في النظام. سيتم تفكيك النص إلى كيانات أولية وإضافته إلى قائمة انتظار المعالجة.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="...اكتب هنا"
                        className="w-full h-24 p-3 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                    />
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="w-full px-4 py-2 font-bold text-white bg-cyan-600 rounded-md hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                    >
                        معالجة النص (Process Text)
                    </button>
                </form>
            </div>
            
            <div className="border border-gray-700 rounded-lg p-6 bg-gray-800/30">
                 <h2 className="text-xl font-bold text-cyan-300 mb-4">أوامر النظام (System Commands)</h2>
                 <p className="text-gray-400 mb-4 text-sm">
                    العمليات في النظام تعمل بشكل تلقائي. يتم توفير هذه اللوحة للتحكم المستقبلي والتفاعلات اليدوية.
                 </p>
                 <div className="flex space-x-4">
                     <button disabled className="px-4 py-2 font-bold text-white bg-gray-600 rounded-md cursor-not-allowed">تحديث البيانات (Manual Refresh)</button>
                     <button disabled className="px-4 py-2 font-bold text-white bg-gray-600 rounded-md cursor-not-allowed">توليد كيانات (Generate Entities)</button>
                 </div>
            </div>
        </div>
    );
};

export default ControlPanel;
