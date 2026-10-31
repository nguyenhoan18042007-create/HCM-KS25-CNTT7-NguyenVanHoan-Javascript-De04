
let products = [
    {
        productCode: "PRD-001",
        productName: "Điện Thoại Nova X1",
        brand: "Nova Mobile",
        stockQuantity: 120,
        warrantyMonths: 12
    },
    {
        productCode: "PRD-002",
        productName: "Máy Tính Bảng Nova Tab",
        brand: "Nova Mobile",
        stockQuantity: 35,
        warrantyMonths: 24
    },
    {
        productCode: "PRD-003",
        productName: "Tai Nghe Sky Buds",
        brand: "Bluesky Audio",
        stockQuantity: 80,
        warrantyMonths: 6
    }
];

// 1. Kiểm tra mã sản phẩm
function validateProductCode(code) {
    if (code === "") {
        return "Chưa nhập mã sản phẩm";
    }

    if (code.length < 6) {
        return "Độ dài nhỏ hơn 6 ký tự";
    }

    if (!code.startsWith("PRD-")) {
        return 'Sai tiền tố "PRD-"';
    }

    if (/\s/.test(code)) {
        return "Chứa khoảng trắng";
    }

    if (findProductIndex(code) !== -1) {
        return "Mã sản phẩm đã tồn tại";
    }

    return "";
}

// 2. Tìm vị trí sản phẩm theo mã
function findProductIndex(code) {
    return products.findIndex(function (product) {
        return product.productCode === code;
    });
}

// 3. Chuẩn hóa chuỗi
function normalizeText(rawText) {
    return rawText
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
}

// 4. Nhập số nguyên trong khoảng cho phép
function inputIntegerInRange(message, min, max) {
    while (true) {
        let input = prompt(message);

        if (input === null) {
            return null;
        }

        input = input.trim();

        if (input === "") {
            alert("Chưa nhập, vui lòng nhập lại!");
            continue;
        }

        let number = Number(input);

        if (!Number.isInteger(number)) {
            alert("Không phải số nguyên, vui lòng nhập lại!");
            continue;
        }

        if (number < min || number > max) {
            alert(`Ngoài phạm vi ${min} - ${max}, vui lòng nhập lại!`);
            continue;
        }

        return number;
    }
}

// 5. Hiển thị danh sách sản phẩm
function displayProducts(list) {
    if (list.length === 0) {
        console.log("Danh sách sản phẩm trống");
        return;
    }

    list.forEach(function (product, index) {
        console.log(
            `${index + 1}. ${product.productCode} - ${product.productName} - ${product.brand}`
        );

        console.log(
            `Số lượng tồn kho: ${product.stockQuantity} | Số tháng bảo hành: ${product.warrantyMonths}`
        );
    });

    console.log(`Tổng: ${list.length} sản phẩm`);
}

// 6. Hiển thị menu
function showMenu() {
    console.log("================================================");
    console.log("HỆ THỐNG QUẢN LÝ SẢN PHẨM CỬA HÀNG TECHZONE");
    console.log("================================================");
    console.log("1. Hiển thị danh sách sản phẩm");
    console.log("2. Thêm sản phẩm mới");
    console.log("3. Cập nhật thông tin sản phẩm");
    console.log("4. Xóa sản phẩm");
    console.log("5. Tìm kiếm sản phẩm theo hãng sản xuất");
    console.log("0. Thoát chương trình");
    console.log("================================================");
}

// 7. Nhập chuỗi không được để trống
function inputText(message) {
    while (true) {
        let input = prompt(message);

        if (input === null) {
            return null;
        }

        input = input.trim();

        if (input === "") {
            alert("Không được để trống, vui lòng nhập lại!");
            continue;
        }

        return normalizeText(input);
    }
}

// 8. Case 1: Hiển thị danh sách sản phẩm
function showProducts() {
    displayProducts(products);
}

// 9. Case 2: Thêm sản phẩm mới
function addProduct() {
    let rawCode = prompt("Nhập mã sản phẩm:");

    if (rawCode === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let productCode = rawCode.trim().toUpperCase();

    let error = validateProductCode(productCode);

    if (error !== "") {
        console.log("Lỗi: " + error);
        return;
    }

    let productName = inputText("Nhập tên sản phẩm:");

    if (productName === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let brand = inputText("Nhập hãng sản xuất:");

    if (brand === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let stockQuantity = inputIntegerInRange(
        "Nhập số lượng tồn kho (0 - 500):",
        0,
        500
    );

    if (stockQuantity === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let warrantyMonths = inputIntegerInRange(
        "Nhập số tháng bảo hành (6 - 36):",
        6,
        36
    );

    if (warrantyMonths === null) {
        console.log("Đã hủy thao tác thêm");
        return;
    }

    let newProduct = {
        productCode: productCode,
        productName: productName,
        brand: brand,
        stockQuantity: stockQuantity,
        warrantyMonths: warrantyMonths
    };

    products.push(newProduct);

    console.log("Thêm sản phẩm thành công!");
    displayProducts([newProduct]);
}

// 10. Case 3: Cập nhật thông tin sản phẩm
function updateProduct() {
    let rawCode = prompt("Nhập mã sản phẩm cần cập nhật:");

    if (rawCode === null) {
        console.log("Đã hủy thao tác cập nhật");
        return;
    }

    let productCode = rawCode.trim().toUpperCase();

    let index = findProductIndex(productCode);

    if (index === -1) {
        console.log(`Không tìm thấy sản phẩm có mã ${productCode}`);
        return;
    }

    let oldQuantity = products[index].stockQuantity;
    let oldWarranty = products[index].warrantyMonths;

    let newQuantity = inputIntegerInRange(
        "Nhập số lượng tồn kho mới (0 - 500):",
        0,
        500
    );

    if (newQuantity === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    let newWarranty = inputIntegerInRange(
        "Nhập số tháng bảo hành mới (6 - 36):",
        6,
        36
    );

    if (newWarranty === null) {
        console.log("Đã hủy cập nhật");
        return;
    }

    products[index].stockQuantity = newQuantity;
    products[index].warrantyMonths = newWarranty;

    console.log("Cập nhật thành công!");

    console.log(
        `Số lượng tồn kho: ${oldQuantity} -> ${newQuantity}`
    );

    console.log(
        `Số tháng bảo hành: ${oldWarranty} -> ${newWarranty}`
    );
}

// 11. Case 4: Xóa sản phẩm
function deleteProduct() {
    let rawCode = prompt("Nhập mã sản phẩm cần xóa:");

    if (rawCode === null) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    let productCode = rawCode.trim().toUpperCase();

    let index = findProductIndex(productCode);

    if (index === -1) {
        console.log(`Không tìm thấy sản phẩm có mã ${productCode}`);
        return;
    }

    let confirmDelete = prompt(
        `Bạn có chắc chắn muốn xóa ${productCode} không? (Y/N)`
    );

    if (
        confirmDelete === null ||
        confirmDelete.trim().toUpperCase() !== "Y"
    ) {
        console.log("Đã hủy thao tác xóa");
        return;
    }

    products.splice(index, 1);

    console.log("Xóa thành công!");
    console.log(`Số sản phẩm còn lại: ${products.length}`);
}

// 12. Case 5: Tìm kiếm theo hãng sản xuất
function searchProduct() {
    let keyword = prompt("Nhập từ khóa tìm kiếm:");

    if (keyword === null || keyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }

    keyword = keyword.trim().toLowerCase();

    let result = products.filter(function (product) {
        return product.brand.toLowerCase().includes(keyword);
    });

    if (result.length === 0) {
        console.log("Không tìm thấy sản phẩm phù hợp");
        return;
    }

    console.log(`Tìm thấy ${result.length} sản phẩm:`);
    displayProducts(result);
}

// 13. Báo cáo tổng kết sản phẩm
function reportProducts() {
    console.log("================================================");
    console.log("BÁO CÁO TỔNG KẾT SẢN PHẨM");
    console.log("================================================");

    if (products.length === 0) {
        console.log("Chưa có sản phẩm nào");
        console.log("================================================");
        return;
    }

    let totalQuantity = products.reduce(function (total, product) {
        return total + product.stockQuantity;
    }, 0);

    let averageQuantity = (
        totalQuantity / products.length
    ).toFixed(1);

    let maxProduct = products.reduce(function (max, product) {
        if (product.stockQuantity > max.stockQuantity) {
            return product;
        }

        return max;
    });

    console.log(`Tổng số sản phẩm: ${products.length}`);

    console.log(
        `Số lượng tồn kho trung bình: ${averageQuantity}`
    );

    console.log(
        `Tồn kho nhiều nhất: ${maxProduct.productCode} - ${maxProduct.productName} - ${maxProduct.stockQuantity}`
    );

    console.log("================================================");
}

// 14. Chương trình chính
function main() {
    while (true) {
        showMenu();

        let choice = prompt("Vui lòng nhập lựa chọn của bạn (0 - 5):");

        if (choice === null || choice.trim() === "") {
            console.log("Lựa chọn không hợp lệ!");
            continue;
        }

        choice = Number(choice.trim());

        if (!Number.isInteger(choice) || choice < 0 || choice > 5) {
            console.log("Vui lòng nhập lựa chọn từ 0 đến 5!");
            continue;
        }

        switch (choice) {
            case 1:
                showProducts();
                break;

            case 2:
                addProduct();
                break;

            case 3:
                updateProduct();
                break;

            case 4:
                deleteProduct();
                break;

            case 5:
                searchProduct();
                break;

            case 0:
                reportProducts();
                console.log("Cảm ơn bạn đã sử dụng chương trình TechZone!");
                return;

            default:
                console.log("Lựa chọn không hợp lệ!");
                break;
        }
    }
}

main();
