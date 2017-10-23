var board = {};


// Macro function plotter
function addCurve(board, func, atts) {
    board.removeObject(board.curve)
    board.curve = board.create('functiongraph', [func], atts);
    return;
}

// Simplified plotting of function
function plot(func, atts) {
   if (atts==null) {
      return addCurve(board, func);
   } else {
      return addCurve(board, func, atts);
   }
}

// Usage of the macro
function doIt() {
    eval(document.getElementById('input').value);
}

function clearAll(board) {
    JXG.JSXGraph.freeBoard(board);
    board = JXG.JSXGraph.initBoard('mainbox', {boundingbox:[0, 1.2,20,-1], axis:true});
    return board;
}



$(document).ready(function() {

    $('#parks1').hide();
    $('#window1').hide();
    $('#FIRopen').hide();
    $('#IIRopen').show(); // Show IIR as default
    $("#windows_parks_mcclellan_span").hide(); // Show IIR as default
    $('#fir_menu_option').hide();
    $("#parks_mcclellan_menu_option").hide(); // Window shows as default
    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [0, 1.5, Math.PI,-.5]});


    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});

$('#FIR').on("click", function() {
        $('#FIRopen').show();
        $('#IIRopen').hide();
        $('#window1').show();
        $('#parks1').hide();
        $('#fir_menu_option').show();
        $('#iir_menu_option').hide();
});

$('#IIR').on("click", function() {
    $('#IIRopen').show();
    $('#FIRopen').hide();
    $('#window1').hide();
    $('#parks1').hide();
    $('#fir_menu_option').hide();
    $('#iir_menu_option').show();
    $('#butlow').on("click", function() {
    })
});
    
$("#fir_iir_selector").change(function() {
    var value = $(this).val();
    //alert(value);
    if (value === "FIR") {
        $('#FIRopen').show();
        $('#IIRopen').hide();
        $('#window1').show();
        $('#parks1').hide();
        $("#windows_parks_mcclellan_span").show();
    } else if (value === "IIR") {
        $('#IIRopen').show();
        $('#FIRopen').hide();
        $('#window1').hide();
        $('#parks1').hide();
        $("#windows_parks_mcclellan_span").hide();
    }
});

$("#windows_parks_mcclellan_selector").change(function() {
    var value = $(this).val();
    if (value === "window") {
        onWindowClick();
    } else if (value === "parks_mcclellan") {
        $('#window1').hide();
        $('#parks1').show();
    }
});
    
$("#iir_filter_type_selector").change(function() {
    var value = $(this).val();
    
    if (value === "butterworth_lowpass") {
        onButterworthLowpassClick();
    } else if (value === "butterworth_highpass") {
        onButterworthHighpassClick();
    } else if (value === "butterworth_bandpass") {
        onButterworthBandpassClick();
    } else if (value === "butterworth_bandreject") {
        onButterworthBandrejectClick();
    }
});
    
$("#fir_filter_type_selector").change(function() {
    //onWindowClick() may take care of this functionality
    var value = $(this).val();
    
    if (value === "highwindow") {
        onHighWindowClick();
    } else if (value === "lowwindow") {
        onLowWindowClick();
    } else if (value === "bandpasswindow") {
        onBandPassWindowClick();
    } else if (value === "bandrejectwindow") {
        onBandPassRejectWindowClick();
    }
})
    
$("#iir_order_type_selector").change(function () {
   var value = $(this).val(); 
    
    if (value === "autoorder") {
        onAutoOrderClick();
    } else if (value === "setorder") {
        onSetOrderClick();
    }
});

function onAutoOrderClick() {
    
}
    
function onSetOrderClick() {
    
}
    
function onButterworthLowpassClick() {
    
}
    
function onButterworthHighpassClick() {
    
}
    
function onButterworthBandpassClick() {
    
}
    
function onButterworthBandrejectClick() {
    
}
    
function onLowWindowClick() {
    JXG.JSXGraph.freeBoard(board);
    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
    var cutoff = $('#lowwindowcutoff').val();
    var order = $('#lowwindoworder').val();
    var alpha = order/2;
    cutoff = parseInt(cutoff)
    board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
    board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
    board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
    for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
        //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
        var x = i
        var y = Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
        board.create('point', [x, y], {type:'plot'});
    }
    board.removeObject(board.curve)
    $('#lowwindowcutoff').on('input', function() {
        JXG.JSXGraph.freeBoard(board);
        board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var alpha = order/2;
        cutoff = parseInt(cutoff)
        console.log("cutoff: " + cutoff)
        board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
        board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
        board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
        for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
            //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
            var x = i
            var y = Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
            board.create('point', [x, y], {type:'plot'});
        }
    });
    $('#lowwindoworder').on('input', function() {
        JXG.JSXGraph.freeBoard(board);
        board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var alpha = order/2;
        cutoff = parseInt(cutoff)
        console.log("cutoff: " + cutoff)
        board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
        board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
        board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
        for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
            //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
            var x = i
            var y = Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
            board.create('point', [x, y], {type:'plot'});
        }
    });
    //board.curve = board.create('point', plotData, {type:'plot'});
    function f(x) {
        return .5 - 0.5*Math.cos((2*Math.PI*x)/order);
    }
    plot(f);
    $('#lowwindowcutoff').on('keyup', function () {
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        function f(x) {
            return 1/Math.sqrt(1 + Math.pow(x/cutoff, 2*order));
        }
        plot(f);
    });
    $('#lowwindoworder').on('keyup', function () {
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        function f(x) {
            return 1/Math.sqrt(1 + Math.pow(x/cutoff, 2*order));
        }
        plot(f);
    });
    $('#lowwindowsamp').on('keyup', function () {
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var samp = $('#lowwindowsamp').val();
        if (samp > 2*cutoff) {
            board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [0, 1.2, samp,-1]});
            function f(x) {
                return 1/Math.sqrt(1 + Math.pow(x/cutoff, 2*order));
            }
            plot(f);
        }
    });
}
    
function onHighWindowClick() {
    JXG.JSXGraph.freeBoard(board);
    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
    var cutoff = $('#lowwindowcutoff').val();
    var order = $('#lowwindoworder').val();
    var alpha = order/2;
    cutoff = parseInt(cutoff)
    board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
    board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
    board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
    for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
        //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
        var x = i
        var y = Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
        board.create('point', [x, y], {type:'plot'});
    }
    $('#lowwindowcutoff').on('input', function() {
        JXG.JSXGraph.freeBoard(board);
        board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var alpha = order/2;
        cutoff = parseInt(cutoff)
        console.log("cutoff: " + cutoff)
        board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
        board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
        board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
        for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
            //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
            var x = i
            var y = Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
            board.create('point', [x, y], {type:'plot'});
        }
    });
    $('#lowwindoworder').on('input', function() {
        JXG.JSXGraph.freeBoard(board);
        board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var alpha = order/2;
        cutoff = parseInt(cutoff)
        console.log("cutoff: " + cutoff)
        board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
        board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
        board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
        for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
            //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
            var x = i
            var y = Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
            board.create('point', [x, y], {type:'plot'});
        }
    });
    //board.curve = board.create('point', plotData, {type:'plot'});
}

function onBandpassWindowClick() {
    JXG.JSXGraph.freeBoard(board);
    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
    var cutoff = $('#lowwindowcutoff').val();
    var cutoff2 = $('#lowwindowcutoff2').val();
    cutoff = cutoff*Math.PI
    cutoff2 = cutoff2*Math.PI
    var order = $('#lowwindoworder').val();
    var alpha = order/2;
    cutoff = parseInt(cutoff)
    board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
    board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
    board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
    for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
        //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
        var x = i
        var y = (Math.sin(cutoff2*(i - alpha)) - Math.sin(cutoff*(i - alpha)))/(Math.PI*(i - alpha))
        board.create('point', [x, y], {type:'plot'});
    }
    $('#lowwindowcutoff').on('input', function() {
        JXG.JSXGraph.freeBoard(board);
        board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
        var cutoff = $('#lowwindowcutoff').val();
        var cutoff2 = $('#lowwindowcutoff2').val();
        var order = $('#lowwindoworder').val();
        var alpha = order/2;
        cutoff = parseInt(cutoff)
        console.log("cutoff: " + cutoff)
        board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
        board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
        board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
        for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
            //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
            var x = i
            var y = (Math.sin(cutoff2*(i - alpha)) - Math.sin(cutoff*(i - alpha)))/(Math.PI*(i - alpha))
            board.create('point', [x, y], {type:'plot'});
        }
    });
    $('#lowwindoworder').on('input', function() {
        JXG.JSXGraph.freeBoard(board);
        board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
        var cutoff = $('#lowwindowcutoff').val();
        var cutoff2 = $('#lowwindowcutoff2').val();
        var order = $('#lowwindoworder').val();
        var alpha = order/2;
        cutoff = parseInt(cutoff)
        console.log("cutoff: " + cutoff)
        board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
        board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
        board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
        for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
            //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
            var x = i
            var y = (Math.sin(cutoff2*(i - alpha)) - Math.sin(cutoff*(i - alpha)))/(Math.PI*(i - alpha))
            board.create('point', [x, y], {type:'plot'});
        }
    });
    $('#lowwindowcutoff2').on('input', function() {
        JXG.JSXGraph.freeBoard(board);
        board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
        var cutoff = $('#lowwindowcutoff').val();
        var cutoff2 = $('#lowwindowcutoff2').val();
        var order = $('#lowwindoworder').val();
        var alpha = order/2;
        cutoff = parseInt(cutoff)
        console.log("cutoff: " + cutoff)
        board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
        board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
        board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
        for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
            //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
            var x = i
            var y = (Math.sin(cutoff2*(i - alpha)) - Math.sin(cutoff*(i - alpha)))/(Math.PI*(i - alpha))
            board.create('point', [x, y], {type:'plot'});
        }
    });
    //board.curve = board.create('point', plotData, {type:'plot'});
}

function onBandrejectWindowClick() {
    JXG.JSXGraph.freeBoard(board);
    board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
    var cutoff = $('#lowwindowcutoff').val();
    var cutoff2 = $('#lowwindowcutoff2').val();
    var order = $('#lowwindoworder').val();
    var alpha = order/2;
    cutoff = parseInt(cutoff)
    board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
    board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
    board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
    for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
        //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
        var x = i
        var y = (Math.sin(cutoff*(i - alpha)) + Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff2*(i - alpha)))/(Math.PI*(i - alpha))
        board.create('point', [x, y], {type:'plot'});
    }
    
    $('#lowwindowcutoff').on('input', function() {
        JXG.JSXGraph.freeBoard(board);
        board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
        var cutoff = $('#lowwindowcutoff').val();
        var cutoff2 = $('#lowwindowcutoff2').val();
        var order = $('#lowwindoworder').val();
        var alpha = order/2;
        cutoff = parseInt(cutoff)
        console.log("cutoff: " + cutoff)
        board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
        board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
        board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
        for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
            //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
            var x = i
            var y = (Math.sin(cutoff*(i - alpha)) + Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff2*(i - alpha)))/(Math.PI*(i - alpha))
            board.create('point', [x, y], {type:'plot'});
        }
    });
    $('#lowwindoworder').on('input', function() {
        JXG.JSXGraph.freeBoard(board);
        board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
        var cutoff = $('#lowwindowcutoff').val();
        var cutoff2 = $('#lowwindowcutoff2').val();
        var order = $('#lowwindoworder').val();
        var alpha = order/2;
        cutoff = parseInt(cutoff)
        console.log("cutoff: " + cutoff)
        board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
        board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
        board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
        for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
            //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
            var x = i
            var y = (Math.sin(cutoff*(i - alpha)) + Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff2*(i - alpha)))/(Math.PI*(i - alpha))
            board.create('point', [x, y], {type:'plot'});
        }
    });
    $('#lowwindowcutoff2').on('input', function() {
        JXG.JSXGraph.freeBoard(board);
        board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
        var cutoff = $('#lowwindowcutoff').val();
        var cutoff2 = $('#lowwindowcutoff2').val();
        var order = $('#lowwindoworder').val();
        var alpha = order/2;
        cutoff = parseInt(cutoff)
        console.log("cutoff: " + cutoff)
        board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
        board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
        board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
        for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
            //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
            var x = i
            var y = (Math.sin(cutoff*(i - alpha)) + Math.sin(Math.PI*(i - alpha)) - Math.sin(cutoff2*(i - alpha)))/(Math.PI*(i - alpha))
            board.create('point', [x, y], {type:'plot'});
        }
    });
    
}
    
function onWindowTypeClick(value) {
    if (value === "rectangular_window") {
        board.removeObject(board.curve)
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var plotData = [
          [],
          []
        ];
        for (i = 0; i < order; i++) {
            plotData[0][i] = i;
        }
        for (i = 0; i < order; i++) {
            plotData[1][i] = 1;
        }
        board.curve = board.create('curve', plotData, {type:'plot'});
        
    } else if (value === "bartlett_window") {
        alert("test");
        board.removeObject(board.curve);
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var rem = (order + 1) % 2;
        if (rem == 0)
        var plotData = [
          [],
          []
        ];
        for (i = 0; i < order; i++) {
            plotData[0][i] = i;
        }
        for (i = 0; i < order; i++) {
            plotData[1][i] = 1;
        }
        board.curve = board.create('curve', plotData, {type:'plot'});
    } else if (value === "hann_window") {
        
    } else if (value === "hamm_window") {
        board.removeObject(board.curve)
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var plotData = [
          [],
          []
        ];
        for (i = 0; i < order; i++) {
            plotData[0][i] = i;
        }
        for (i = 0; i < order; i++) {
            plotData[1][i] = .54 - .46*Math.cos((2*Math.PI*i)/order);
        }
        board.curve = board.create('curve', plotData, {type:'plot'});
    } else if (value === "gaussian_window") {
        board.removeObject(board.curve)
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var plotData = [
          [],
          []
        ];
        for (i = 0; i < order; i++) {
            plotData[0][i] = i;
        }
        for (i = 0; i < order; i++) {
            plotData[1][i] = 1;
        }
        board.curve = board.create('curve', plotData, {type:'plot'});
        
    } else if (value === "blackman_window") {
        board.removeObject(board.curve)
        var cutoff = $('#lowwindowcutoff').val();
        var order = $('#lowwindoworder').val();
        var plotData = [
          [],
          []
        ];
        for (i = 0; i < order; i++) {
            plotData[0][i] = i;
        }
        for (i = 0; i < order; i++) {
            plotData[1][i] = .42 - .5*Math.cos((2*Math.PI*i)/order) + .08*Math.cos((4*Math.PI*i)/order);
        }
        board.curve = board.create('curve', plotData, {type:'plot'});
    }
    
}
function onWindowClick() {
    $('#parks1').hide();
    $('#window1').show();
    //$("#window_menu_option").show();
    //$("#parks_mcclellan_menu_option").hide();
    $('#hann_window').on("click", function() {
            //default state == lowpass
            JXG.JSXGraph.freeBoard(board);
            board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
            var cutoff = $('#lowwindowcutoff').val();
            var order = $('#lowwindoworder').val();
            var alpha = order/2;
            cutoff = parseInt(cutoff)
            board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
            board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
            board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
            for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                var x = i
                var y = Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
                board.create('point', [x, y], {type:'plot'});
            }
            $('#lowwindowcutoff').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
                    board.create('point', [x, y], {type:'plot'});
                }
            });
            $('#lowwindoworder').on('input', function() {
                JXG.JSXGraph.freeBoard(board);
                board = JXG.JSXGraph.initBoard('mainbox', {axis:true,boundingbox: [9.997, 1100, 10.003,-1000]});
                var cutoff = $('#lowwindowcutoff').val();
                var order = $('#lowwindoworder').val();
                var alpha = order/2;
                cutoff = parseInt(cutoff)
                console.log("cutoff: " + cutoff)
                board.setBoundingBox([alpha - .003, cutoff + 100, alpha + .003, -cutoff])
                board.create('axis',[[alpha - .003,0],[alpha + .003,0]],{strokeColor:'red'});
                board.create('axis',[[alpha,-cutoff],[alpha,cutoff]],{strokeColor:'red'});
                for (i = alpha - .003; i < alpha + .003; i = i + .0001) {
                    //plotData[1][i] = Math.sin(1000*Math.PI*(i - 10))/(Math.PI*(i - 10));
                    var x = i
                    var y = Math.sin(cutoff*Math.PI*(i - alpha))/(Math.PI*(i - alpha));
                    board.create('point', [x, y], {type:'plot'});
                }
            });
    });
}
    
$("#window_window_selector").change(function() {
    var value = $(this).val();
    onWindowTypeClick(value);
})
    
$("#parks_window_selector").change(function() {
    var value = $(this).val();
    onWindowTypeClick(value);
})

$('#window').on("click", function() {
    onWindowClick();
});
$('#parks').on("click", function() {
    $('#window1').hide();
    $('#parks1').show();
    $("#window_menu_option").hide();
    $("#parks_mcclellan_menu_option").show();
});
$('#IIRpress').on("click", function() {
    $('#window1').hide();
    $('#parks1').hide();
    $('#IIR').show();
});
    
});

