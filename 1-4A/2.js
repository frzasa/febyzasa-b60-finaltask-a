function hitungVoucher(belanja, voucher, uangDibayar) {
    // voucher
    const vouchers = {
        "DumbWaysJos": { diskon: 0.211, minBelanja: 50000, maksDiskon: 20000 },
        "DumbWaysMantap": { diskon: 0.30, minBelanja: 80000, maksDiskon: 40000 }
    };
    
    if (!vouchers[voucher]) {
        return "Voucher tidak dapat digunakan";
    }
    
    const data = vouchers[voucher];
    
    if (belanja < data.minBelanja) {
        return "Belanja tidak memenuhi syarat minimum voucher ini";
    }
    
    // Hitung potongan harga
    let potongan = belanja * data.diskon;
    if (potongan > data.maksDiskon) {
        potongan = data.maksDiskon;
    }
        console.log("Potongan:", potongan);
        
        const totalBiaya = belanja - potongan;
    console.log("Total Biaya:", totalBiaya);
    
    // Hitung kembalian
    if (uangDibayar < totalBiaya) {
        return "Uang dibayar kurang!";
    }
    const kembalian = uangDibayar - totalBiaya;
    console.log("Kembalian:", kembalian);
    
    return {
        belanja,
        voucher,
        potongan,
        uangDibayar,
        totalBiaya,
        uangDibayar,
        kembalian
    };
}

console.log(hitungVoucher(100000, "DumbWaysJos", 100000));

