import { FC } from "react";

const EmptyState: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Нет активного чата</h2>
      <p className="text-gray-500">Выберите чат или создайте новый, чтобы начать общение.</p>
    </div>
  );
};

export default EmptyState;