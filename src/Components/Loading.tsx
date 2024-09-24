export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex justify-center [&_div]:size-4 [&_div]:my-8 [&_div]:mx-[0.3rem] [&_div]:bg-text [&_div]:rounded-[50%] [&_div]:animate-boo [&_div:nth-child(2)]:[animation-delay:_0.3s] [&_div:nth-child(3)]:[animation-delay:_0.6s] ">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
