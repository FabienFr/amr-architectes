export default function FooterSection() {
  return (
    <footer className="py-12 bg-white/70 text-black px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left space-y-2">
          <div>
            <h3 className="font-extrabold text-xl tracking-wide uppercase font-archivo">
              AMR
            </h3>
            <h3 className="font-extrabold text-xl tracking-wide uppercase font-archivo">
              ARCHITECTES
            </h3>
          </div>
          <p>145 Av. JF Kennedy, 64200 Biarritz</p>
          <p>06 85 95 05 06</p>
          <p>michael@amr-architectes.com</p>
        </div>
        <div className="text-center md:text-right space-y-2">
          <p>Lundi au vendredi : 9h00 - 16h00</p>
        </div>
      </div>
    </footer>
  );
}
