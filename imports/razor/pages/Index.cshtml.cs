namespace MythCore.Pages;

[Authorize]
public class IndexModel : PageModel
{
    private readonly ITenantService tenantService;

    public IndexModel(ITenantService tenantService)
    {
        this.tenantService = tenantService;
    }

    public void OnGet()
    {
        tenantService.GetTenant();
    }
}
