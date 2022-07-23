using Business;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddTransient<UsersBo, UsersBo>();
builder.Services.AddTransient<PlanesBo, PlanesBo>();
builder.Services.AddTransient<PlaneSpottingBo, PlaneSpottingBo>();
builder.Services.AddSession();

builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


app.UseSession();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors("default");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
