namespace Bercy.RestApi.Tests
{
    using System.Net;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.TestHost;
    using Microsoft.VisualStudio.TestTools.UnitTesting;

    [TestClass]
    public class UnitTest1
    {
        private readonly HttpClient client;

        public UnitTest1()
        {
            var server = new TestServer(new WebHostBuilder().UseEnvironment("Developement").UseStartup<Startup>());
            this.client = server.CreateClient();
        }

        [TestMethod]
        public async Task CallWeatherForecast()
        {
            var request = new HttpRequestMessage(new HttpMethod("GET"), $"/api/v1.0/weatherforecast");

            var response = await this.client.SendAsync(request);

            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
        }
    }
}
