import { useAppContext } from "../context/AppContext";

export function PointsBar() {
  const { user } = useAppContext();

  return (
    <div className="w-full bg-primary text-primary-foreground py-3 px-4 shadow-md flex justify-center items-center" data-testid="points-bar">
      <p className="font-serif text-lg md:text-xl font-medium tracking-wide">
        You've brewed {user.points} points ☕
      </p>
    </div>
  );
}
