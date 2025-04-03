import Link from "next/link";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white font-serif">
      <section className="text-center">
        <h1 className="text-5xl font-bold text-black">Whoa, chậm lại nào!!</h1>

        <div
          className="relative h-96 flex items-center justify-center bg-cover bg-center mt-4"
          style={{
            backgroundImage:
              "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
          }}        ></div>
        <div className="mt-6">
          <h3 className="text-3xl font-semibold">Có vẻ như bạn đang hơi quá háo hức để trãi nghiệm rồi.</h3>
          <p className="text-gray-600 mt-2">Chúng tôi đã tạm thời dừng bạn lại một chút.  
          Hãy thư giãn một lát và thử lại sau nhé.</p>
          <Link
            href="/"
            className="mt-4 inline-block px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
          >
            Trang chủ
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page;
