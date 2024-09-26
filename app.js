$(document).ready(function(){ //Đây là một hàm jQuery đảm bảo rằng mã JavaScript sẽ chỉ chạy sau khi toàn bộ tài liệu HTML đã được tải.
    $('location-form').submit(function(event) { //Xử lý sự kiện khi form được gửi đi. Khi người dùng nhấn nút "Get Weather", sự kiện submit sẽ được kích hoạt
        event.preventDefault(); //Ngăn không cho trang web tải lại khi form được gửi
        var city = $('#city-input').val().trim(); //Lay gia tri value cua input va loai bo khoang trang o dau vaf cuoi 
        if(city !== '') {
            getweather(city);
        }
    });

    function getweather(city) { //Hàm này sẽ gửi yêu cầu đến API OpenWeatherMap để lấy thông tin thời tiết cho thành phố được nhập vào.
        var apikey = 'YOUR API KEY';
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // units=metric để lấy dữ liệu nhiệt độ theo độ C.

        $.ajax({ //Gửi yêu cầu AJAX tới OpenWeatherMap API.
            url: url,
            method: 'Get',
            success: function(response) { //Nếu yêu cầu thành công, hàm này sẽ được gọi với dữ liệu trả về (được chứa trong biến response
                $('#weather-display').show();
                $('#location').text(response.name + ',' + response.sys.country);
                $('#temperature').text('Temperature: ' + response.main.temp + ' °C');
                $('#weather-condition').text('condition: ' + response.weather[0].description);
                $('#humidity').text('Humidity: ' + response.main.humidity + "%");
                $('#wind-speed').text('Wind Speed: ' + response.wind.speed + "m/s");
            },
            error: function() {
                alert('Could not retrieve weather data. Please try again.');
            }
        });
    }
});