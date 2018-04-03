var raw_img = document.getElementById('raw_img');
var processed_canvas = document.getElementById('processed_canvas');
var img_uploader = document.getElementById('img_uploader');

var clear_btn = document.getElementById('clear_btn');
var invert_btn = document.getElementById('invert_btn');

// img_data = {
//     data: [r_00, g_00, b_00, a_00, ..., r_ij, g_ij, b_ij, a_ij, ...],
//     width: processed_canvas.width,
//     height: processed_canvas.height
// }
var img_data, img_data_origin;

function Pixel(r, g, b, a){
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}


img_uploader.onchange = function(event) {
    var selected_img = event.target.files[0];
    var reader = new FileReader();
    // set the callback function first
    reader.onload = function(event) {
        // replace the original image with the uploaded one
        raw_image.src = event.target.result; // the data url

        // show the uploaded image on the canvas
        put_image_to_canvas(event.target.result);

        img_data_origin = context.getImageData(0, 0, img.width, img.height); 
        img_data = img_data_origin.slice();
        
        // var pixels = new Array();
        // // convert the 
        // while(img_data.data.length) pixels.push(img_data.data.splice(0,4));
            
        // // [[123, 66, 233, 0], ..., [r, g, b, a]]
        
        // var pixel_matrix = [];
        // // 
        // while(pixels.length) pixel_matrix.push(pixels.splice(img.width))
    }
    reader.readAsDataURL(selected_img);
}

clear_btn.onclick = function() {
    context.putImageData(img_data_origin, img.width, img.height);
}

invert_btn.onclick = function(){
    for_each_pixel(image, )
    context.putImageData(img_data, img.width, img.height);
}

function put_image_to_canvas(src) {
    var img = new Image();
    img.src = src;
    img.onload = function(){
        processed_canvas.width = img.width;
        processed_canvas.height = img.height;
        var context = processed_canvas.getContext('2d');
        context.drawImage(img, 0, 0);  // draw the image on canvas
    }
}

function get_pixel(image_data, i, j){
    let p_ij = (i * img_data.width + j) * 4;

    return [img_data.data[p_ij],
            img_data.data[p_ij + 1],
            img_data.data[p_ij + 2],
            img_data.data[p_ij + 3]
            ];
}

// set the corresponding data of pixel_mat[i][j] 
// in the raw 1-D img_data
// to given (r, g, b, a)
function set_pixel(img_data, i, j, r, g, b, a){
    let p_ij = (i * img_data.width + j) * 4;
    img_data.data[p_ij] = r;
    img_data.data[p_ij + 1] = g;
    img_data.data[p_ij + 2] = b;
    img_data.data[p_ij + 3] = a;
}

function set_pixel(img_data, i, j, pixel){
    set_pixel(img_data, i, j, pixel.r, pixel.g, pixel.b, pixel.a);
}

// func = [r, g, b, a] => []
function for_each_pixel(img_data, func){
    for (let i = 0; i < img_data.width; i++ ) {
        for (let j = 0; j < img_data.height; j++){
            set_pixel(img_data, i, j, func(get_pixel(img_data, i, j)))
        }
    }
}