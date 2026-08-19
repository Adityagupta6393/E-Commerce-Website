function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-sm sm:text-base text-gray-300 text-center sm:text-left">
            © {new Date().getFullYear()} ShopHub. All rights reserved.
          </p>

          <p className="text-xs sm:text-sm text-gray-400 text-center">
            Shop smart. Shop better.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;